import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // warm daylight bazaar — cream ground, terracotta + saffron + turquoise ornament
        bg: "#F6EEE0", // cream / ivory page
        "bg-2": "#EFE3CC", // deeper cream band
        surface: "#FCF7EC", // card / stall panel (warm ivory)
        cream: "#F6EEE0",
        clay: "#C2542F", // terracotta — primary warm
        "clay-deep": "#A23F22",
        saffron: "#E2A12C", // saffron gold
        gold: "#E2A12C", // alias kept for existing markup
        turquoise: "#2E9D95", // deep majolica turquoise (not neon)
        "turquoise-dim": "#1C7E77",
        "turquoise-deep": "#14706A",
        ink: "#3B2A1D", // warm dark brown text
        muted: "#8A7259", // warm taupe
        line: "#E4D6BC", // warm sand border
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        "trail-draw": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "lattice-dissolve": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "spark-float": {
          "0%": { opacity: "0", transform: "translateY(0) scale(0.6)" },
          "30%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(-40px) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
