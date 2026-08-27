/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "cosmic-black": "#070812",
      "cosmic-deep": "#05060C",
      "cosmic-dark": "#0B0D19",
      "cosmic-navy": "#111827",
      "cosmic-indigo": "#171E34",
      "cosmic-violet": "#B6A1D9",
      "cosmic-cyan": "#8FA8FF",
      "cosmic-white": "#F2F0EA",
      "cosmic-light": "#F7F5EF",
      "cosmic-lavender": "#B6A1D9",
      "cosmic-warm": "#D8C7B5",
      "muted": "#A8A8B7",
      "soft-muted": "#6F7180",
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
      serif: ["Cormorant Garamond", "Georgia", "serif"],
    },
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        glow: '0 0 45px rgba(182, 161, 217, 0.22)',
      },
    },
  },
  plugins: [],
}

