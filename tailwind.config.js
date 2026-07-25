/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)", // page background (light)
        ink: "var(--ink)", // primary text (dark)
        muted: "var(--muted)", // secondary text
        accent: "var(--accent)", // brand accent
        onaccent: "var(--on-accent)", // text on top of the solid accent
        surface: "var(--surface)", // raised panels
        line: "var(--line)", // hairline borders
      },
      fontFamily: {
        // secondary — body & UI
        sans: ["Hanken Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        // primary — display (Cormorant = free, more condensed GT Alpina alternative)
        serif: [
          "Cormorant",
          "ui-serif",
          "Georgia",
          "serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter2: "-0.03em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
