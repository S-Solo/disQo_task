module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    textColor: {
      black: "#333",
      white: "#fff",
      placeholder: "#AAA",
      red: "#EC3646",
    },
    colors: {
      "gray-border": "#CCC",
      blue: "#39ACDC",
    },
    backgroundColor: {
      blue: "#39ACDC",
      red: "#EC3646",
      green: "#57B93E",
      body: "#EEE",
      white: "#fff",
    },
    fontSize: {
      "main-title": "24px",
      "input-label": "12px",
      "notes-header": "18px",
      button: "14px",
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
