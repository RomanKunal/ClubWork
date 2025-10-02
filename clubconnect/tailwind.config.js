// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214.3, 31.8%, 91.4%)",
        background: "#ffffff",
        foreground: "#000000",
      }
    }
  },
  plugins: [],
}
