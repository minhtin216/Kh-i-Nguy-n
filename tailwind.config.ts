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
          "system-ui",
          "sans-serif",
        ],
        mono: ["Geist Mono", "SF Mono", "JetBrains Mono", "Menlo", "monospace"],
      },
      colors: {
        /* ── Warm neutral ink scale ── */
        ink: {
          50:  "#faf9f7",   /* page background light */
          100: "#f2f0ec",   /* subtle hover, input bg */
          200: "#e5e1da",   /* border light */
          300: "#ccc8be",   /* muted border */
          700: "#504e49",   /* secondary text */
          800: "#2f2d2a",   /* strong text */
          900: "#1c1a17",   /* headings / primary text */
          950: "#141210",   /* dark mode page bg — warm dark, not pitch black */
        },
        /* ── Sidebar dark surface ── */
        canvas: {
          dark: "#1a1815",  /* dark sidebar / panel bg */
        },
        /* ── Amber/brass accent ── */
        brass: {
          50:  "#fdf6e8",
          100: "#f7e7c0",
          200: "#edcc88",
          500: "#9c7129",
          600: "#7d5a1e",
        },
      },
      boxShadow: {
        /* Light mode panels */
        panel:       "0 1px 3px rgba(20,18,16,0.06), 0 8px 32px -12px rgba(20,18,16,0.12)",
        "panel-md":  "0 4px 16px -4px rgba(20,18,16,0.14), 0 1px 3px rgba(20,18,16,0.06)",
        /* Dark mode panels */
        "panel-dark": "0 1px 2px rgba(0,0,0,0.3), 0 8px 32px -12px rgba(0,0,0,0.5)",
        /* Active nav glow */
        "glow-amber": "0 0 0 3px rgba(156,113,41,0.18), 0 0 20px rgba(156,113,41,0.08)",
        /* KPI card tones */
        "glow-green": "0 0 18px -4px rgba(52,101,56,0.12)",
        "glow-red":   "0 0 18px -4px rgba(159,47,45,0.12)",
        "glow-blue":  "0 0 18px -4px rgba(31,108,159,0.12)",
        "glow-yellow":"0 0 18px -4px rgba(149,100,0,0.12)",
      },
      transitionTimingFunction: {
        mass:    "cubic-bezier(0.16, 1, 0.3, 1)",
        spring:  "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth:  "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "fade-up":    "fadeUp 560ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in":    "fadeIn 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in":   "slideIn 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
        pulseQuiet:   "pulseQuiet 2.4s ease-in-out infinite",
        shimmer:      "shimmer 2s linear infinite",
        "glow-pulse":  "glowPulse 3s ease-in-out infinite",
        float:        "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%":   { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseQuiet: {
          "0%, 100%": { opacity: "0.5", transform: "scale(0.9)" },
          "50%":      { opacity: "1",   transform: "scale(1.05)" },
        },
        shimmer: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 6px 0 rgba(156,113,41,0.0)" },
          "50%":      { boxShadow: "0 0 14px 0 rgba(156,113,41,0.22)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
