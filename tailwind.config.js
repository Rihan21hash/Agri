/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          '"DM Sans"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          '"Outfit"',
          '"Space Grotesk"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        "agri-green": {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        "harvest-gold": {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        "soil-dark": {
          50: "#f7f6f5",
          100: "#e6e4e1",
          200: "#cac4bd",
          300: "#a9a196",
          400: "#847a6e",
          500: "#695f54",
          600: "#524a41",
          700: "#413a34",
          800: "#36312d",
          900: "#2e2a27",
          950: "#181513",
        },
        cream: {
          50: "#fcfcfb",
          100: "#f6f4f0",
        },
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(24, 21, 19, 0.05), 0 4px 24px -4px rgba(24, 21, 19, 0.08)",
        card: "0 1px 3px rgba(24,21,19,0.06), 0 8px 32px -8px rgba(24, 21, 19, 0.1)",
        "card-hover": "0 4px 12px rgba(24,21,19,0.08), 0 16px 40px -12px rgba(24, 21, 19, 0.15)",
        floating: "0 10px 40px -10px rgba(34, 197, 94, 0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulseSoft 2s ease-in-out infinite",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
