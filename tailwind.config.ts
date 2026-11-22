import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#07182D",
        navy2: "#0B2340",
        royal: "#1457B8",
        cyan: "#19BDE6",
        silver: "#EAF1F7",
        gold: "#D6AB62",
      },
      fontFamily: {
        ar: ["var(--font-ibm-ar)", "Tahoma", "sans-serif"],
        en: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
