/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.js", "./src/**/*.css"],
  theme: {
    extend: {
      colors: {
        "soft-gold": "#f9b17a",
        "slate-grey": "#424769",
        "soft-blue": "#676f9d",
        "slate-blue": "#2d3250",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
