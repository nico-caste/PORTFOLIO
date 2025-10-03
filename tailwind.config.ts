import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0D1117',
        'surface': '#161B22',
        'primary': '#2F3740',
        'accent': {
          'DEFAULT': '#33D8A3',
          'hover': '#2CC996',
        },
        'text-main': '#CDD5DF',
        'text-secondary': '#8A93A0',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        display: ['Onest', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config