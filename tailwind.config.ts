import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          white: '#f5f5f7',
          ink: '#1d1d1f',
          gray: '#86868b',
          dim: '#6e6e73',
          line: '#d2d2d7',
          card: '#161617',
          blue: '#0071e3',
          link: '#0066cc',
          'link-dark': '#2997ff',
        },
      },
    },
  },
  plugins: [],
};
export default config;
