/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1F7ED8',
          teal: '#28C2D1',
        },
        dark: {
          grey: '#2C2F36',
        }
      }
    },
  },
  plugins: [],
}