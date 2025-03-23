/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"; // ✅ Use import instead of require
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    import("@tailwindcss/typography"), daisyui
  ], daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#a991f7',
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#3d4451',
          "base-100": '#ffffff',
        }
      },
      {
        business: {
          ...import("daisyui/src/theming/themes")["business"],
        }
      },
      "light",
      "dark",
      "cupcake",
      "forest",
      "business"
    ],
  }
}

