/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fall: {
          '0%': {
            transform: 'translateY(0) translateX(0) rotate(-45deg)',
            opacity: 0
          },
          '10%': {
            opacity: 0.5
          },
          '100%': {
            transform: 'translateY(100vh) translateX(-100vh) rotate(-45deg)',
            opacity: 0
          }
        }
      },
      animation: {
        'fall': 'fall 10s linear infinite'
      }
    },
  },
  plugins: [],
};