import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: "0.0.0.0",
    https: {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/pxmx-home.ddns.net/privkey.pem"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/pxmx-home.ddns.net/fullchain.pem"
      ),
    },
    port: 443,
    allowedHosts: [
      "pxmx-home.ddns.net", // Добавьте сюда ваш ngrok адрес
    ],
  },
});
