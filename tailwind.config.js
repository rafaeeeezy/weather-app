/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(45deg, #2f4680, #500ae4)',
      }
    },
  },
  plugins: [],
}
