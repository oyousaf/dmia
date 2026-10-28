// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://dmia.legxcysol.dev",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  redirects: {
    "/services-0": "/services",
    "/projects": "/work",
    "/collaboration": "/partners",
  },
});
