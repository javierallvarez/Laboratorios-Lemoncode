/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3DDC82',
          dark: '#37CA7A',
        },
        gray: {
          light: '#F3F4F6',
          dark: '#1F2937',
          textLight: '#374151',
          textDark: '#F9FAFB',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
        black: {
          DEFAULT: '#111827',
        },
        red: {
          light: '#F87171',
          dark: '#EF4444',
        },
        yellow: {
          light: '#FBBF24',
          dark: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}

