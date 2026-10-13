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
        cinema: {
          950: '#050508',
          900: '#09090f',
          850: '#0e0e17',
          800: '#141421',
          700: '#1e1e30',
          600: '#2d2d48',
          accent: '#e50914', // Cinematic red
          gold: '#f59e0b', // Film grade amber gold
          cyan: '#06b6d4', // Cyber/motion cyan
          violet: '#8b5cf6', // Motion glow
        }
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        cinematic: ['"Cinzel"', 'serif'],
        tech: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 12s linear infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'cinema-radial': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(9, 9, 15, 0) 70%)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #06b6d4 0deg, #8b5cf6 120deg, #e50914 240deg, #06b6d4 360deg)',
      }
    },
  },
  plugins: [],
}
