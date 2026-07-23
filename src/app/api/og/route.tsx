import { ImageResponse } from "next/og";
import { parties } from "@/data/parties";

// The default next/og font has no Hebrew glyphs, so we pull Heebo from Google
// Fonts at render time. The IE11 User-Agent forces Google to serve a TTF
// (satori can't parse woff2), and `text` subsets the file to just the glyphs
// we draw so the fetch stays tiny.
async function loadHeebo(text: string, weight: number): Promise<ArrayBuffer> {
  const api = `https://fonts.googleapis.com/css2?family=Heebo:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (
    await fetch(api, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
      },
    })
  ).text();
  const url = css.match(
    /src: url\((.+?)\) format\('(?:woff|truetype|opentype)'\)/
  )?.[1];
  if (!url) throw new Error("Could not resolve Heebo font URL");
  return await (await fetch(url)).arrayBuffer();
}

// satori (bundled in next/og here) does no bidi reordering — it lays glyphs out
// in logical order, left to right, so Hebrew comes out mirrored. We compensate
// by pre-reversing: flip the letters of each Hebrew word and the word order,
// while leaving numbers and Latin (e.g. "2026", the domain) untouched so they
// stay readable. Rendered LTR, this yields correct right-to-left Hebrew.
const hasHebrew = (t: string) => /[֐-׿]/.test(t);
function heb(text: string): string {
  return text
    .split(" ")
    .map((w) => (hasHebrew(w) ? [...w].reverse().join("") : w))
    .reverse()
    .join(" ");
}

// #rrggbb -> rgba(), so we can tint glows/shadows from the party's own color.
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const party = parties.find((p) => p.id === searchParams.get("p"));
  const rawScore = Number(searchParams.get("s"));
  const score = Number.isFinite(rawScore)
    ? Math.max(0, Math.min(100, Math.round(rawScore)))
    : 0;

  const partyName = party?.name ?? "השאלון";
  const partyLogo = party?.logo ?? "מצפן";
  const partyColor = party?.color ?? "#2563eb";

  // The party name is the hero — scale it to fill the width without overflowing,
  // and keep the percentage strictly smaller so the hierarchy reads name → %.
  const nameLen = [...partyName].length;
  const nameSize =
    nameLen <= 3
      ? 184
      : nameLen <= 5
      ? 152
      : nameLen <= 8
      ? 122
      : nameLen <= 11
      ? 98
      : 82;
  const percentSize = Math.min(96, Math.round(nameSize * 0.62));

  const brand = heb("מצפן בחירות 2026");
  const kicker = heb("המפלגה שהכי מתאימה לי");
  const matchLabel = heb("התאמה");
  const nameText = heb(partyName);
  const logoText = heb(partyLogo);

  const glyphs =
    "מצפן בחירות 2026 המפלגה שהכי מתאימה לי התאמה " +
    "elections.fishdev.org" +
    partyName +
    partyLogo +
    "0123456789% ";

  const [regular, bold] = await Promise.all([
    loadHeebo(glyphs, 500),
    loadHeebo(glyphs, 800),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontFamily: "Heebo",
          color: "#ffffff",
          backgroundColor: "#0b1220",
          backgroundImage:
            "linear-gradient(160deg, #0b1220 0%, #141d30 55%, #0b1220 100%)",
        }}
      >
        {/* soft glow in the party color, centered behind the hero, to fill the
            canvas and give the card depth */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1150px",
            height: "1150px",
            display: "flex",
            backgroundImage: `radial-gradient(circle, ${hexToRgba(
              partyColor,
              0.5
            )} 0%, ${hexToRgba(partyColor, 0)} 62%)`,
          }}
        />

        {/* top accent stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "12px",
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${partyColor}, #3b82f6)`,
          }}
        />

        {/* top brand — kept present top-center for recall */}
        <div
          style={{
            position: "absolute",
            top: "46px",
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            {brand}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "54px",
              height: "54px",
              borderRadius: "14px",
              background: partyColor,
              fontSize: "27px",
              fontWeight: 800,
            }}
          >
            {logoText}
          </div>
        </div>

        {/* hero — centered so key info stays inside WhatsApp's crop safe area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "40px",
              fontWeight: 500,
              color: "#cbd5e1",
              marginBottom: "4px",
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: `${nameSize}px`,
              fontWeight: 800,
              lineHeight: 1.02,
              color: "#ffffff",
            }}
          >
            {nameText}
          </div>

          {/* percentage badge — prominent but secondary to the party name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "36px",
              background: partyColor,
              borderRadius: "28px",
              padding: "16px 56px",
              boxShadow: `0 22px 60px ${hexToRgba(partyColor, 0.55)}`,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: `${percentSize}px`,
                fontWeight: 800,
                lineHeight: 1,
                color: "#ffffff",
              }}
            >
              {score}%
            </div>
            <div
              style={{
                display: "flex",
                fontSize: `${Math.round(percentSize * 0.36)}px`,
                fontWeight: 500,
                color: "rgba(255,255,255,0.9)",
                marginTop: "2px",
              }}
            >
              {matchLabel}
            </div>
          </div>
        </div>

        {/* bottom brand / domain — second recall anchor + implicit CTA */}
        <div
          style={{
            position: "absolute",
            bottom: "44px",
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            fontWeight: 800,
            letterSpacing: "0.5px",
            color: "#94a3b8",
          }}
        >
          elections.fishdev.org
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Heebo", data: regular, weight: 500, style: "normal" },
        { name: "Heebo", data: bold, weight: 800, style: "normal" },
      ],
    }
  );
}
