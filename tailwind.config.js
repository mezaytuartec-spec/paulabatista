/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#26222E',
        muted: '#6E6878',
        line: '#ECE8F3',
        mist: '#EDECF3', // color de la pared en la foto del hero
        cream: '#FBF8F3',
        lav: { 50: '#F8F5FC', 100: '#F1ECF9', 200: '#E6DDF4', 300: '#CDBDE9' },
        violet: { 500: '#7A5CB8', 600: '#6A4CA8', 700: '#583D8F' },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
