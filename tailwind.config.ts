import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Geist",
          "SF Pro Display",
          "SF Pro Text",
          "Aptos",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["Geist Mono", "SF Mono", "JetBrains Mono", "monospace"],
      },
      colors: {
        ink: {
          50: "#fbfbfa",
          100: "#f4f3f1",
          200: "#e8e6e1",
          300: "#d5d0c7",
          700: "#3b3f3c",
          800: "#262a27",
          900: "#171a18",
          950: "#0e100f",
        },
        brass: {
          50: "#fbf4e3",
          100: "#f4e4bd",
          500: "#8a6424",
          600: "#6f4f1d",
        },
      },
      boxShadow: {
        panel: "0 18px 60px -46px rgba(24, 26, 24, 0.42)",
        "panel-dark": "0 18px 70px -48px rgba(0, 0, 0, 0.9)",
      },
      transitionTimingFunction: {
        mass: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up": "fadeUp 680ms cubic-bezier(0.16, 1, 0.3, 1) both",
        pulseQuiet: "pulseQuiet 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        shimmer: "shimmer 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseQuiet: {
          "0%, 100%": { opacity: "0.55", transform: "scale(0.96)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
