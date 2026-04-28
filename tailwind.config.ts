import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#07130d',
          900: '#0b1d13',
          850: '#10271a',
          800: '#153322',
          700: '#1f4b31',
          600: '#2d6945'
        },
        earth: {
          900: '#362817',
          700: '#755831',
          500: '#a8854f',
          300: '#d7c29a'
        },
        cream: {
          50: '#fbf8ee',
          100: '#f5efdf',
          200: '#e8dcc2',
          300: '#d5c39f'
        },
        moss: {
          100: '#dfe7d1',
          300: '#a4b889',
          500: '#637a4f'
        }
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Helvetica Neue', 'sans-serif']
      },
      boxShadow: {
        botanical: '0 28px 90px rgba(7, 19, 13, 0.22)',
        gold: '0 20px 55px rgba(168, 133, 79, 0.24)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem'
      },
      backgroundImage: {
        'grain': 'radial-gradient(circle at 15% 20%, rgba(168,133,79,.16), transparent 24%), radial-gradient(circle at 82% 5%, rgba(99,122,79,.18), transparent 28%), linear-gradient(135deg, #fbf8ee 0%, #f5efdf 48%, #e8dcc2 100%)',
        'forest-depth': 'radial-gradient(circle at 20% 20%, rgba(164,184,137,.18), transparent 30%), radial-gradient(circle at 75% 25%, rgba(168,133,79,.16), transparent 28%), linear-gradient(145deg, #07130d 0%, #10271a 52%, #1b2d1e 100%)'
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(.16, 1, .3, 1)',
        garden: 'cubic-bezier(.22, .61, .36, 1)'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        floatLeaf: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(18px, -20px, 0) rotate(4deg)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-130%)' },
          '100%': { transform: 'translateX(130%)' }
        },
        pulseRing: {
          '0%': { transform: 'scale(.92)', opacity: '.65' },
          '100%': { transform: 'scale(1.5)', opacity: '0' }
        }
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'float-leaf': 'floatLeaf 8s ease-in-out infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.2s ease-out infinite'
      }
    }
  },
  plugins: []
};

export default config;