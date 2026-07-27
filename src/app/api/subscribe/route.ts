import { NextResponse } from "next/server";

// Opt-in emails from the results page are appended to a private Google Sheet
// via a bound Apps Script web-app. Set SHEET_WEBHOOK_URL (the Apps Script
// deployment URL) in the environment; the feature is inert until it is set.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const webhook = process.env.SHEET_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: {
    email?: string;
    topParty?: string;
    locale?: string;
    website?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill. Bots that fill it get a
  // silent success and nothing is stored.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        topParty: (body.topParty ?? "").slice(0, 60),
        locale: (body.locale ?? "").slice(0, 5),
        ts: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`sheet responded ${res.status}`);
  } catch {
    return NextResponse.json({ error: "store_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
