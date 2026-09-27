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
          gray: '#86868b',
          card: '#161617',
          blue: '#0071e3',
        },
      },
    },
  },
  plugins: [],
};
export default config;
