module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'netflix-black': '#0b0b0b',
      }
    }
  },
  variants: {
    extend: {
      flex: ['group-hover', 'hover'],
      flexDirection: ['group-hover', 'hover'],
      position: ['group-hover', 'hover'],
    },
  },
  plugins: [],
}
