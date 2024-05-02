/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      screens: {
        xxl: "1640px",
      },
      gridTemplateColumns: {
        xxl: "repeat(6, minmax(0, 1fr))",
      },
      fontFamily: {
        gilroy: ["Gilroy", "serif"],
      },
      textColor: {
        lightColor: "#212121",
        darkColor: "#ffffff",
      },
      colors: {
        lightColor: "#f6fbf8",
        cardLight: "#eff0f4",

        darkColor: "#111017",
        cardDark: "#1d1928",
      },
      boxShadow: {
        inner: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "slide-left": "slide-left 20s linear infinite",
        gradient: "gradient 3s ease infinite",
      },
      keyframes: {
        "slide-left": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-100%)" },
        },
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
