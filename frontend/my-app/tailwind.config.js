/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D90429',
          dark: '#8D021F',
          light: '#FFE5E8'
        }
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(217,4,41,.25)'
      }
    },
    server: {
  proxy: {
    '/api': 'http://localhost:5000',
  }
}

  },
  plugins: [],
}
