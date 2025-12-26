import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1f8ff",
          100: "#dceeff",
          200: "#b6dbff",
          300: "#89c2ff",
          400: "#56a5ff",
          500: "#2b88ff",
          600: "#1069e6",
          700: "#084fcc",
          800: "#063fa3",
          900: "#042f7a"
        }
      }
    }
  },
  plugins: []
};

export default config;
