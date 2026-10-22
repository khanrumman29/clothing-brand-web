/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#121212',
          dark: '#1c1c1e',
          gray: '#71717a',
          lightGray: '#f4f4f5',
          cardBg: '#f3f4f6',
          beige: '#ede8e1',
          accent: '#e11d48'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        script: ['"Caveat"', '"Playfair Display"', 'cursive'],
      }
    },
  },
  plugins: [],
}
