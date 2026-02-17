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
        'inexorable': '#FFC183',
        'excruciating': '#FFE599',
        'merciless': '#A7E58D',
        'monstrous': '#5BAD96',
        'apocalyptic': '#528CB1',
        'demonic': '#6D6AB0',
        'menacing': '#9452A2',
        'unreal': '#913869',
        'nightmare': '#832828',
        'fuck': '#000000',
        'supremeObserver': '#9900FF',
        'divineCouncil': '#FF00FF',
        'observer': '#FF0000',
        'sheetEditor': '#9CFF75'
      }
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [],
}
