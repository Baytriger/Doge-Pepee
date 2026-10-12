import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Doge Pepe ($DOPE)",
    short_name: "DOPE",
    description: "A Shiba with Pepe's face, live on BNB Chain.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffcf2",
    theme_color: "#ffc21a",
    icons: [
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
