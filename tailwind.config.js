
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'min-83': '-83px',
      },
      colors: {
        "body-background-color": "#f9fafb",
        "font-color": "#333",
        "fade-silver": "#e6ebf1",
        "aside-background-color": "#0c1427",
        "gray-50": "#fafafb",
        "green-100": "#1c6a41",
        "silvery": "#f3f0f0",
        "light-silvery": "#e7e7e7",
        "gray-10": "rgb(217, 217, 229)",
        "shadow": "#0004"
      },
      inset: {
        "drop": "73px",
        "lefted": "-45px"
      },
      height: {
        'full-screen': '100vh',
      },
      width: {
        "w-50p": "50%",
        "w-75p": "70%",
        "w-100p": "100%"
      },
      minWidth: {
        "464": "464px",
        "700": "700px",
        "500": "550px",
        "992": "992px"
      },
      fontSize: {
        "headline": "30px",
        "big-modal": "40px",
        "svg": "1.25rem",
        "xs": "12px",
        "us": "10px",
        "26": "26px"
      },
      zIndex: {
        '1000': '1000',
      },
      fontWeight: {
        "lightbold": "500"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
