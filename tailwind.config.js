/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // smooth “appear + lift” (fallback-friendly)
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },

        // fancy shimmer/glow pulse (GPU-friendly)
        "glow-pulse": {
          "0%, 100%": { filter: "drop-shadow(0 0 0 rgba(56,189,248,0))" },
          "50%": { filter: "drop-shadow(0 0 18px rgba(56,189,248,.55))" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 900ms cubic-bezier(.2,.9,.2,1) both",
        "glow-pulse": "glow-pulse 2.2s ease-in-out infinite",
      },
    },
  },
};
