/** @type {import('tailwindcss').Config} */
// Force Tailwind Rebuild
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        gold: {
          300: '#FAD96A',
          400: '#F5C842',
          500: '#E0B030',
          600: '#C9A227',
        },
        silver: {
          700: '#D1D5DB', // border
          800: '#F3F4F6', // input bg / hover bg
          900: '#FFFFFF', // main bg
        },
        slate: {
          50:  '#1E293B',
          100: '#334155',
          200: '#475569',
        },
        ruby: {
          300: '#FCA5A5',
          400: '#EF4444',
          500: '#DC2626',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
      },
      animation: {
        'fade-in':      'fadeIn 0.8s ease-out forwards',
        'fade-in-up':   'fadeInUp 0.9s ease-out forwards',
        'slide-in':     'slideIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
