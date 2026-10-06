import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pad: '#f2f1ec',
        ink: '#111214',
        steel: '#55575c',
        nasa: '#d4291a',
        flight: '#1d3fbf',
        sky: '#cfdeec',
        vacuum: '#05060a',
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-hangul)', '"Pretendard Variable"', 'sans-serif'],
        stencil: ['var(--font-stencil)', 'var(--font-hangul)', 'sans-serif'],
        hangul: ['var(--font-hangul)', '"Pretendard Variable"', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
