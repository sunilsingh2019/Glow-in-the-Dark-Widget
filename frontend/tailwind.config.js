/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glow-green': '#39FF14',
        'dark-blue': '#0A1929',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 