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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const party = parties.find((p) => p.id === searchParams.get("p"));
  const rawScore = Number(searchParams.get("s"));
  const score = Number.isFinite(rawScore)
    ? Math.max(0, Math.min(100, Math.round(rawScore)))
    : 0;

  const partyName = party?.name ?? "השאלון";
  const partyLogo = party?.logo ?? "מצפן";
  const partyColor = party?.color ?? "#3b82f6";

  const glyphs =
    "מצפן בחירות 2026 המפלגה שהכי מתאימה לי התאמה גלו גם אתם לאיזו אתם מתאימים " +
    partyName +
    partyLogo +
    "0123456789%‹›";

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
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          textAlign: "right",
          direction: "rtl",
          background: "linear-gradient(135deg, #0b1220 0%, #1e293b 100%)",
          color: "#ffffff",
          fontFamily: "Heebo",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* flag-stripe accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "14px",
            display: "flex",
          }}
        >
          <div style={{ flex: 1, background: "#1e3a8a", display: "flex" }} />
          <div style={{ flex: 1, background: "#3b82f6", display: "flex" }} />
        </div>

        {/* brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "36px",
            fontWeight: 800,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: partyColor,
              fontSize: "26px",
              fontWeight: 800,
            }}
          >
            {partyLogo}
          </div>
          <div style={{ display: "flex" }}>מצפן בחירות 2026</div>
        </div>

        {/* main */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", fontSize: "34px", color: "#94a3b8" }}>
            המפלגה שהכי מתאימה לי
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "104px",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            {partyName}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "18px",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "132px",
                fontWeight: 800,
                color: "#3b82f6",
              }}
            >
              {score}%
            </div>
            <div style={{ display: "flex", fontSize: "42px", color: "#cbd5e1" }}>
              התאמה
            </div>
          </div>
        </div>

        {/* cta */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#ffffff",
            color: "#0b1220",
            fontSize: "32px",
            fontWeight: 800,
            padding: "18px 32px",
            borderRadius: "9999px",
          }}
        >
          ‹ גלו גם אתם לאיזו מפלגה אתם מתאימים
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
