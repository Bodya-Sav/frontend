import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Разрешить доступ с других устройств
    port: 5173, // Указать порт явно
  },
  allowedHosts: [
    "pxmx-home.ddns.net", // Добавьте сюда ваш ngrok адрес
  ],
});
