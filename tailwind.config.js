/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-background': "url('/images/hero.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
