module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'netflix-black': '#141414',
      }
    }
  },
  variants: {
    extend: {
      fontSize: ['responsive', 'hover', 'focus'],
      fontWeight: ['hover', 'focus'],
    },
  },
  plugins: [],
}
