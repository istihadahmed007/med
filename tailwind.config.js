/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        med: {
          950: '#050811', // Deep midnight space
          900: '#0a1020', // Midnight base
          850: '#0e172e', // Elevated panel
          800: '#141f3d', // Card foundation
          700: '#1e2c52', // Border / subtle highlight
          600: '#2c3e6f',
          accent: {
            blue: '#2563eb',
            electric: '#38bdf8',
            cyan: '#06b6d4',
            teal: '#14b8a6',
            emerald: '#10b981',
            rose: '#f43f5e',
            amber: '#f59e0b',
            purple: '#8b5cf6',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'glow-blue': '0 0 30px -5px rgba(37, 99, 235, 0.3)',
        'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
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
