import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#FFF8F2",
          100: "#FFEEDD",
          200: "#FFDCBA",
          500: "#E8500A",
          600: "#D44A09",
          700: "#B83D07",
        },
        navy: {
          50: "#EEF3FA",
          100: "#D8E5F5",
          700: "#1A3A5C",
          800: "#0F2447",
          900: "#080F1E",
        },
        cream: {
          50: "#FFFDF8",
          100: "#FFF8ED",
          200: "#FFF0D6",
        },
        primary: {
          DEFAULT: "#E8500A",
          50: "#FFF8F2",
          100: "#FFEEDD",
          500: "#E8500A",
          600: "#D44A09",
          700: "#B83D07",
        },
        accent: {
          DEFAULT: "#0F2447",
          500: "#1A3A5C",
          600: "#0F2447",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-jakarta)", "sans-serif"],
      },
      backgroundImage: {
        "hero-mesh": `
          radial-gradient(ellipse at 15% 60%, rgba(232,80,10,0.07) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 15%, rgba(15,36,71,0.05) 0%, transparent 55%)
        `,
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 8px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.07)",
        saffron: "0 4px 20px rgba(232,80,10,0.18)",
      },
      animation: {
        "fade-up": "fadeUp 0.45s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
