import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          600: "#2563eb",
          solid: "#1d4ed8",
        },
      },

      keyframes: {
        bottom: {
          "0%": { opacity: "0", bottom: "-100px" },
          "100%": { opacity: "1", bottom: "0" },
        },
      },
      animation: {
        bottom: "bottom 0.5s",
      },
      backgroundImage: {
        bannerOverlay:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 110%)",
      },
    },
  },
  plugins: [],
};

export default config;

export const tw: any = config.theme?.extend;
