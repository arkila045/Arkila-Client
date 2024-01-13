import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': 'url("/bg-main.png")',
      },
      colors: {
        primary: '#B60000',
        'main-blue': '#4285F4',
        'main-black': '#5B5B5B',
        'main-black-100': '#333333'
      }
    },
  },
  plugins: [],
}
export default config
