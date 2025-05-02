/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      keyframes: {
        pencil: {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        pencil: 'pencil 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}

