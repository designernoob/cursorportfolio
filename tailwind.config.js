/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        cream: "var(--cream)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        surface: "var(--surface)",
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
