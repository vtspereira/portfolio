/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4361ee',
        secondary: '#4cc9f0',
        dark: {
          primary: '#2b2d42',
          secondary: '#4f5d75',
        },
        light: {
          primary: '#f8f9fa',
          secondary: '#ffffff',
        },
        linkedin: '#0077B5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'hover': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 