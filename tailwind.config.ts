import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      screens: {
        ss: "350px",
        xs: "576px",
        sm: "680px",
        md: "768px",
        lg: "993px",
        xl: "1200px",
        xxl: "1300px",
        "2xl": "1536px",
      },

      colors: {
        "primary-text": "#242424",
        secondary: "#646464",
        custom1: "#CCCCCC",
        custom2: "#FD5631",
        custom3: "#181A20D8",
        custom4: "#F7F7F7",
        custom5: "#6E6D7A",
        custom6: "#FC6C61",
        custom7: "#545b62",
        custom8: "#FFF5F4",
        custom9: "#FFDAD4",
        custom10: "#E3E3E3",
        custom11: "#E8E8E8",
        custom12: "#0A2357",
        custom13: "#AEAEAE"
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
      },
      aspectRatio: {
        "2/2": "2 / 2",
        "3/2": "3 / 2",
        "4/2": "4 / 2",
        "4/4": "4 / 4",
        "250/80": "250 / 80",
        "150/80": "150 / 80",
        "80/80": "80 / 80",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "smooth-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25%)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "smooth-bounce": "smooth-bounce 5s infinite",
        "spin-slow": "spin 12s linear infinite",
        shake: "shake 0.5s ease-in-out",
      },
      boxShadow: {
        "2xl": "0 0 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
} satisfies Config;

export default config;
