import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#2a1a12",
        ivory: "#f7f1e6",
        paper: "#fffaf3",
        saffron: "#c2410c",
        gold: "#b45309",
        turquoise: "#0f766e",
        crimson: "#b91c1c",
        sky: "#7bdff2",
        clay: "#9c6644",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(46, 196, 182, 0.35)",
        gold: "0 0 36px rgba(232, 197, 71, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
