/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#1e40af', // ホワイトテーマ: 濃い青
        'accent-dark': '#3b82f6', // ダークテーマ: 明るい青
      },
    },
  },
  darkMode: 'class', // 重要: <html>にdarkクラスでダークモードを制御
  plugins: [],
};