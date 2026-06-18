import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
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
        // "Velvet Slate" — dashboard skin. Channel-based vars (set in globals.css)
        // so light/dark switch from one source of truth and support /alpha.
        d: {
          bg: "rgb(var(--d-bg) / <alpha-value>)",
          surface: "rgb(var(--d-surface) / <alpha-value>)",
          elev: "rgb(var(--d-elev) / <alpha-value>)",
          border: "rgb(var(--d-border) / <alpha-value>)",
          "border-strong": "rgb(var(--d-border-strong) / <alpha-value>)",
          ink: "rgb(var(--d-ink) / <alpha-value>)",
          muted: "rgb(var(--d-muted) / <alpha-value>)",
          faint: "rgb(var(--d-faint) / <alpha-value>)",
          hover: "rgb(var(--d-hover) / <alpha-value>)",
          accent: "rgb(var(--d-accent) / <alpha-value>)",
          primary: "rgb(var(--d-primary) / <alpha-value>)",
          gold: "rgb(var(--d-gold) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgb(15 18 23 / 0.04), 0 2px 6px rgb(15 18 23 / 0.06)",
        "soft-md": "0 2px 4px rgb(15 18 23 / 0.05), 0 10px 28px -10px rgb(15 18 23 / 0.14)",
        "soft-lg": "0 4px 10px rgb(15 18 23 / 0.06), 0 24px 50px -16px rgb(15 18 23 / 0.20)",
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
