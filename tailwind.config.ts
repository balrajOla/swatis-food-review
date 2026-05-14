import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:     '#4A7C59',
        secondary:   '#829486',
        dark:        '#101010',
        'text-muted':'#555555',
        cream:       '#F3EFE6',
        blush:       '#FAF1EE',
        accent:      '#69BDB9',
        salmon:      '#F2BCAF',
        'border-muted': '#C7C7C7',
      },
      fontFamily: {
        serif:   ['Special Elite', 'Georgia', 'serif'],
        display: ['Bebas Neue', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(16,16,16,0.12)',
        card: '0 4px 32px rgba(16,16,16,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
