/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nss: {
          blue: '#0035A0',
          darkBlue: '#002266',
          lightBlue: '#E6F0FF',
          gray: '#F3F4F6',
          darkGray: '#374151',
          border: '#D1D5DB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'mobile-sm': ['12px', '16px'],
        'mobile-base': ['14px', '20px'],
        'mobile-lg': ['18px', '24px'],
        'mobile-xl': ['24px', '32px'],
      },
      borderRadius: {
        'icon-square': '4px',
      }
    },
  },
  plugins: [],
}