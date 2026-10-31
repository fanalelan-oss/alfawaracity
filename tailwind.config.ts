import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        fawara: {
          dark: "#080c10",
          card: "#0f1622",
          border: "#1f2a3c",
          gold: "#d4af37",
          goldLight: "#f3e5ab",
          goldDark: "#997d1e",
          emerald: "#10b981",
          emeraldDark: "#065f46",
          accent: "#2563eb",
          muted: "#94a3b8"
        }
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        tajawal: ["Tajawal", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
