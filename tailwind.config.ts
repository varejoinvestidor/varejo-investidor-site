import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        paper: "#fbfaf7",
        line: "#e9e4da",
        rise: "#0f8f56",
        fall: "#c72f2f",
        gold: "#b8892d",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      boxShadow: {
        premium: "0 30px 90px rgba(5, 5, 5, 0.12)",
        fine: "0 14px 40px rgba(5, 5, 5, 0.07)",
        glass: "0 18px 60px rgba(5, 5, 5, 0.09)",
      },
    },
  },
  plugins: [],
};

export default config;
