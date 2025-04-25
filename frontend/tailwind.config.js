/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // 濃い青（仮定）
        secondary: '#1F2937', // 濃いグレー（仮定）
        accent: '#6366F1', // インディゴ（仮定）
        'accent-dark': '#4F46E5', // ダークモード用アクセント（仮定）
      },
    },
  },
  darkMode: 'class', // ダークモードをclassベースで有効
  plugins: [],
};