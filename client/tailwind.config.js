import img from "./src/home_background_2.jpg";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        profile_image_h: "6vh",
        card_block: "70vh",
        left_height: "93vh",
        "11/12": "91.666667%",
        "1/12": "8.333333%",
        margin_in_Card: "9%",
        Image_in_Card: "45%",
        Contentent_in_Card: "35%",
        profile_image_onNews: "5vh",
      },
      width: {
        profile_image_w: "6vh",
        card_width: "93%",
        profile_image_onNews: "5vh",
      },
    },
  },
  plugins: [],
};
