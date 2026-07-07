/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A0A0B',
          900: '#141416',
          800: '#1E1E21',
          700: '#2A2A2E',
        },
        paper: {
          50: '#FAF9F7',
          100: '#F2F0EC',
          200: '#E5E2DC',
        },
        ember: {
          400: '#FF9142',
          500: '#FF7A1A',
          600: '#F0530C',
          700: '#E63312',
        },
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'ember-gradient': 'linear-gradient(90deg, #FF9142 0%, #FF7A1A 40%, #E63312 100%)',
      },
    },
  },
  plugins: [],
}
