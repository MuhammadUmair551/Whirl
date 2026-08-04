import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:   '#FFF8EE',
        surface: '#FFFFFF',
        ink:     '#2B1B12',
        border:  '#EFE1C7',
        muted:   '#8A7560',
        subtle:  '#C2B29C',
        accent:  '#FFC93C',
        flavor: {
          pb:         '#C17F3E',
          strawberry: '#FF6F91',
          fudge:      '#6B4226',
          mango:      '#FFA63D',
        },
      },
      fontFamily: {
        display: ['Chewy', 'cursive'],
        sans:    ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        chunky: '0 6px 0 rgba(43,27,18,0.20)',
        float:  '0 16px 40px rgba(43,27,18,0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
