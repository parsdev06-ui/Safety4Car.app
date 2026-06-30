/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#0F172A",
          DEFAULT: "#2563EB",
        },
        signal: {
          blue: "#2563EB",
        },
        trust: {
          emerald: "#10B981",
        },
        caution: {
          amber: "#F59E0B",
        },
        risk: {
          red: "#EF4444",
        },
        surface: "#FFFFFF",
        background: "#F8FAFC",
        border: "#E5E7EB",
        muted: "#6B7280",
        text: "#111827",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      fontFamily: {
        sans: ["Inter", "System"],
      },
    },
  },
  plugins: [],
};
