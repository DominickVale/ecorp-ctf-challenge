/** @type {import('tailwindcss').Config} */
const { letterSpacing: defaultLetterSpacing } = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    // golden ratio
    fontSize: {
      xs: ".7rem", // 0.618rem would be too small (9px)
      smaller: ".75rem", // dashboard, 12px
      sm: "1rem",
      md: "1.125rem", //dashboard, 18px
      base: "1.618rem",
      lg: "2.618rem",
      xl: "4.236rem",
      "2xl": "6.875rem",
      "3xl": "11.09rem",
    },
    letterSpacing: {
      ...defaultLetterSpacing,
      action: "0.18em",
      display: "0.195em",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
      short: { raw: "(min-height: 600px)" },
      tall: { raw: "(min-height: 800px)" },
      taller: { raw: "(min-height: 1000px)" },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-chakra)"],
        heading: ["var(--font-heading)"],
      },
      colors: {
        background: {
          light: "#F1F1F1",
          dark: "#181818",
        },
        foreground: "hsl(var(--foreground))",
        elements: {
          lightest: "#D2D2D2",
          light: "#575757",
        },
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        layout: "80px repeat(13, 1fr) 80px",
        golden: "61.8% 14.6% 23.6%",
      },
      gridTemplateRows: {
        layout: "57px 1fr 57px",
        golden: "56.5% 38.2%", //accounts for 57px navbar
      },
      gridColumnEnd: {
        13: "13",
        14: "14",
        15: "15",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        /* offset-x | offset-y | blur-radius | spread-radius | color */
        //box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        "neon-white": "0 0 1rem 0.5rem rgba(255,255,255, 0.4)",
      },
    },
  },
  plugins: [],
};
