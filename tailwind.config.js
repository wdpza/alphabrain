/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"]
  },
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#570df8",
          secondary: "#f000b8",
          accent: "#37cdbe",
          neutral: "#3d4451",
        },
        dark: {
          primary: "#6419e6",
          secondary: "#d926a9",
          accent: "#1fb2a6",
          neutral: '#191d24'
        },
        cupcake: {
          primary: "#65c3c8",
          secondary: "#ef9fbc",
          accent: "#eeaf3a",
          neutral: "#291334",
        },
        dracula: {
          primary: "#ff7ac6",
          secondary: "#bf95f9",
          accent: "#ffb86b",
          neutral: "#414558",
        },
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
};