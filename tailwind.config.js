/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
        kumbhSans: ['"Kumbh Sans"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
      },
    },
    colors: {
      white: "#fff",
      black: "#000",
      link: "#808286",
      background: "#F2F2F2",
      form: "#fafafa",
      activeLink: "#263238",
      secondary: "#0D63D3",
      hoverLink: "#D8E6F8",
      user: "#F2F8FF",
      textForm: "#737373",
      formBg: "#EBEBEB",
      otp: "#4A4A68",
      coincard: "#666666",
      lightgreen: "rgba(42, 181, 125, 0.3)",
      darkGreen: "#2AB57D",
      lightred: "rgba(255, 154, 152, 0.3)",
      darkred: "#FD625E",
      gray: "#344054",
      tableHead: "#F1F1F1",
      userDetails: "#7C7C7C",
      submit: "#1C1C93",
    },
  },
  plugins: [],
};
