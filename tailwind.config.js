/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif']
      },
      fontSize: {
        vh: ['12vh', '14vh']
      },
      colors: {
        'beginner': '#4A86E8',
        'easy': '#00FFFF',
        'medium': '#00FF00',
        'hard': '#FFFF00',
        'veryhard': '#FF9900',
        'insane': '#FF0000',
        'extreme': '#FF00FF',
        'remorseless': '#9900FF',
        'relentless': '#B087EB',
        'terrifying': '#F19EEA',
        'catastrophic': '#EA6661',
        'fuck': '#000000'
      }
    },
  },
  plugins: [],
}
