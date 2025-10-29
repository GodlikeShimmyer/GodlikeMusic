/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'godlike-green': '#00C46A',
        'godlike-blue': '#0077FF',
        'godlike-cyan': '#00E5FF',
        'dark-bg': '#121212',
        'dark-surface': '#181818',
        'dark-elevated': '#282828',
        'dark-highlight': '#2A2A2A',
        'dark-subdued': '#A7A7A7',
      },
      backgroundImage: {
        'gradient-godlike': 'linear-gradient(135deg, #00C46A 0%, #0077FF 50%, #00E5FF 100%)',
        'gradient-dark': 'linear-gradient(180deg, rgba(18,18,18,0.8) 0%, rgba(18,18,18,1) 100%)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
