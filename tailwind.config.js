/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '12px',
        'space-4': '16px',
        'space-5': '20px',
        'space-6': '24px',
        'space-8': '32px',
        'space-10': '40px',
        'space-12': '48px',
        'space-16': '64px',
        'space-20': '80px',
        'space-24': '96px',
      },
      borderRadius: {
        'med-sm': '8px',
        'med-md': '12px',
        'med-lg': '16px',
        'med-xl': '20px',
        'med-2xl': '24px',
      },
      colors: {
        // Concept Design Tokens
        'med-bg': '#040D21',
        'med-bg-secondary': '#0A2854',
        'med-royal': '#1748A0',
        'med-primary': '#08AFC1',
        'med-text-main': '#F5F9FF',
        'med-text-secondary': '#C4D4EA',
        'med-text-muted': '#8EACCF',
        'med-text-subtle': '#627D98',
        'med-glass-fill': 'rgba(18, 55, 99, 0.30)',
        'med-reading': 'rgba(6, 23, 46, 0.85)',
        'med-border': 'rgba(190, 225, 255, 0.20)',
        med: {
          950: '#040D21', // Deep royal-blue background
          900: '#0A2854', // Secondary royal background
          850: '#0e172e', // Elevated panel
          800: '#141f3d', // Card foundation
          700: '#1e2c52', // Border / subtle highlight
          600: '#2c3e6f',
          accent: {
            blue: '#1748A0',
            electric: '#38bdf8',
            cyan: '#08AFC1',
            teal: '#14b8a6',
            emerald: '#10b981',
            rose: '#f43f5e',
            amber: '#f59e0b',
            purple: '#8b5cf6',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Noto Sans Bengali"', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'Inter', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -3px rgba(8, 175, 193, 0.35)',
        'glow-blue': '0 0 30px -5px rgba(23, 72, 160, 0.4)',
        'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.25)',
        'glass': '0 12px 32px 0 rgba(0, 0, 0, 0.35)',
        'glass-highlight': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
