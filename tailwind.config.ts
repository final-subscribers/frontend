/** @type {import("tailwindcss").Config} */

function responsiveFontSize(webSize: string, mobileSize: string) {
  return {
    DEFAULT: webSize,
    mobile: mobileSize,
  };
}


module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      mobile: "360px",
      tablet: "768px",
      desktop1: "1280px",
      desktop2: "1617px",
    },
    extend: {
      colors: {
        "neutral": {
          "0": "#ffffff",
          "5": "#f7f7f7",
          "10": "#e8eaea",
          "20": "#cbd0d7",
          "30": "#b2b6be",
          "40": "#949ca8",
          "50": "#778292",
          "60": "#606877",
          "70": "#49505a",
          "80": "#32373e",
          "90": "#1B1E22",
          "100": "#000000"
        },
        "primary": {
          "5": "#EDF0FD",
          "10": "#D6DEFA",
          "20": "#A8B9F5",
          "30": "#7B93F0",
          "40": "#4D6EEA",
          "50": "#204AE5",
          "60": "#1639BB",
          "70": "#112B8E",
          "80": "#0B1D60",
          "90": "#060F32",
        },
        "secondary": {
          "5": "#E0FAF2",
          "10": "#CAF7E9",
          "20": "#9EF0D7",
          "30": "#72E9C5",
          "40": "#46E1B3",
          "50": "#22D39E",
          "60": "#1BA77D",
          "70": "#178C69",
          "80": "#0E5943",
          "90": "#0D3C2E",
        },
        "red": {
          "5": "#FEECF0",
          "10": "#FCD4DE",
          "20": "#FAA3B9",
          "30": "#F77394",
          "40": "#F4436F",
          "50": "#F1134B",
          "60": "#C60C3A",
          "70": "#95092C",
          "80": "#65061E",
          "90": "#350310",
        },
        "orange": {
          "5": "#FFF8EB",
          "10": "#FFF0D1",
          "20": "#FFDF9E",
          "30": "#FFCE6B",
          "40": "#FFBD38",
          "50": "#FFAD05",
          "60": "#D18C00",
          "70": "#A36D00",
          "80": "#704B00",
          "90": "#3D2900",
        },
        "blue": {
          "5": "#F5FCFE",
          "10": "#DEF4FD",
          "20": "#AEE5F9",
          "30": "#7DD6F6",
          "40": "#4FC7F3",
          "50": "#1FB8EF",
          "60": "#119ACB",
          "70": "#0B779D",
          "80": "#08536E",
          "90": "#0B3C4E",
        },
      },
      fontSize: {
        // Display styles
        "display-lg": "66px",
        "display-lg-m": "40px",

        "display-base": "50px",
        "display-base-m": "32px",

        "display-sm": "40px", 
        "display-sm-m": "25px",

        // Heading styles
        "heading-lg": "50px",
        "heading-lg-m": "40px",

        "heading-base": "40px",
        "heading-base-m": "32px",

        "heading-sm": "32px",
        "heading-sm-m": "20px",

        // Title styles
        "title-2xl": "32px",
        "title-2xl-m": "23px",

        "title-xl": "25px",
        "title-xl-m": "21px",

        "title-lg": "21px",
        "title-lg-m": "19px",

        "title-base": "19px",
        "title-base-m": "17px",

        "title-sm": "17px",
        "title-sm-m": "15px",

        "title-xs": "15px",
        "title-xs-m": "13px",

        // Body styles
        "body-lg": "19px",
        "body-lg-m": "17px",

        "body-base": "17px",
        "body-base-m": "15px",

        "body-sm": "15px",
        "body-sm-m": "13px",

        // Detail styles
        "detail-xl": "19px",
        "detail-xl-m": "17px",

        "detail-lg": "17px",
        "detail-lg-m": "15px",

        "detail-base": "15px",
        "detail-base-m": "13px",

        "detail-sm": "13px",
        "detail-sm-m": "11px",

        // Label styles
        "label-lg": "19px",
        "label-lg-m": "15px",

        "label-base": "17px",
        "label-base-m": "13px",

        "label-sm": "15px",
        "label-sm-m": "11px",

        "label-xs": "13px",
        "label-xs-m": "9px",

        // Links styles
        "links-lg": "19px",
        "links-lg-m": "17px",

        "links-base": "17px",
        "links-base-m": "15px",

        "links-sm": "15px",
        "links-sm-m": "13px",
      },
      spacing: {
        "0": "0px",
        "1": "2px",
        "2": "4px",
        "3": "8px",
        "4": "12px",
        "5": "16px",
        "6": "20px",
        "7": "24px",
        "8": "32px",
        "9": "40px",
        "10": "48px",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}