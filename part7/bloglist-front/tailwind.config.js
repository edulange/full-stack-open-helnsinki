/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Nunito', 'sans-serif']
      },
      fontSize: {
        'base': '16px', // substitua pelo tamanho desejado
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

