

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/preline/dist/*.js"// Add all your React files
  ],
  theme: {
    extend: {
      colors: {
        primaryBrown: "#5E3023",
      },
      fontFamily: {
        'noto-serif-devanagari': ['Noto Serif Devanagari', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),
  require('preline/plugin'),],
}