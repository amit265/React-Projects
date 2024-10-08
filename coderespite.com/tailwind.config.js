/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' if you prefer automatic dark mode based on user preferences

  theme: {
    extend: {
      keyframes: {
        anime: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100px)" }, // Adjust to your desired translation
        },
      },
      animation: {
        "project-animate": "anime 10s linear infinite alternate",
      },
      fontFamily: {
        'albert': ['Albert Sans', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
      },
    },
    keyframes: {
      move: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-100%)' },
      },
    },
    animation: {
      move: 'move 20s linear infinite',
    },
  },
  plugins: [],
};
