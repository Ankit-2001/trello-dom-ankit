/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./dist/*.js"],
  // theme: {
  //   extend: {},
  // },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
    base: false,
  },
};

