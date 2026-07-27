import type { MetadataRoute } from "next";

// Served at /manifest.webmanifest. Makes the site installable to the phone home
// screen — the point being that a compass sitting on the home screen gets opened
// again on the way to the polling station, which a bookmark never does.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "מצפן בחירות 2026",
    short_name: "מצפן בחירות",
    description:
      "ענו על השאלון וגלו אילו מפלגות מייצגות את העמדות שלכם בצורה הטובה ביותר.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "he",
    dir: "rtl",
    background_color: "#f8fafc",
    theme_color: "#0b132b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
