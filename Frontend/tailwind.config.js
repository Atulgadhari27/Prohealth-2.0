/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./src/*.{html, js, jsx}",
    ],
  theme: {
    colors: {
      primary: "#27C690",
      secondary: "#9CB2AA",
      tertiary: "#B2D8CB",
      bgprimary: "#FAFCFF",
      bgsecondary: "#E3FAFB",
    },
    fontFamily: {
      roboto: ["Roboto", "ui-sans-serif"],
      poppins: ["Poppins", "ui-sans-serif"],
      lato: ["Lato", "SFMono-ui-monospace"],
    },
  },
  plugins: [],
}