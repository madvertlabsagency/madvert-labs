import { ImageResponse } from "next/og";

/**
 * Branded Open Graph card for any page: /og?title=…&label=…
 * Used by pageMetadata() whenever a page has no image of its own (case studies and resources use
 * their real covers). Text only comes from the query, is length-limited and is rendered as text.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = (url.searchParams.get("title") ?? "Digital Marketing & Growth Systems").slice(0, 110);
  const label = (url.searchParams.get("label") ?? "Madvert Labs").slice(0, 40);
  const logo = await fetch(new URL("/brand/logo-dark.png", url.origin))
    .then((r) => (r.ok ? r.arrayBuffer() : null))
    .catch(() => null);
  const logoSrc = logo ? `data:image/png;base64,${Buffer.from(logo).toString("base64")}` : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 15%, rgba(0,180,255,0.35), transparent 45%), radial-gradient(circle at 10% 110%, rgba(0,229,255,0.22), transparent 50%), #0a0f1c",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} width={300} height={67} alt="" />
          ) : (
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>MADVERT LABS</div>
          )}
          <div style={{ display: "flex", fontSize: 22, color: "#00e5ff", border: "2px solid rgba(0,229,255,0.5)", borderRadius: 999, padding: "8px 22px" }}>{label}</div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 68, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, color: "rgba(255,255,255,0.72)" }}>
          <div style={{ display: "flex", width: 56, height: 4, borderRadius: 4, background: "linear-gradient(90deg,#00b4ff,#00e5ff)" }} />
          Beyond Advertising. We Build Growth Systems.
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400" } },
  );
}
