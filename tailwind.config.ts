import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d4d8e0",
          300: "#aab0bd",
          400: "#7a8295",
          500: "#535b6e",
          600: "#3a4252",
          700: "#2a3140",
          800: "#1c2230",
          900: "#10141d",
        },
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#b9d8ff",
          300: "#86bcff",
          400: "#4d99ff",
          500: "#1f74f7",
          600: "#0f5ce0",
          700: "#0d49b3",
          800: "#0e3d8f",
          900: "#0e336f",
        },
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', "Pretendard", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
