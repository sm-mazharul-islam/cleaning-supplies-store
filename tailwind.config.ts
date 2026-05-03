import type { Config } from "tailwindcss";

const config: Config = {
  // ১. ডার্ক মোড এনাবল করা (এটি ছাড়া dark: ক্লাস কাজ করবে না)
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Consistent Spacing System (8px Grid)
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },

      // Unified Border Radius System
      borderRadius: {
        card: "2rem", // For main category/product cards
        btn: "1rem", // For action buttons
        input: "0.75rem", // For form fields
        dropdown: "1.25rem",
      },

      // Typography & Gradients
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // Custom color alias
      colors: {
        primaryBlue: "#2563eb",
      },
    },
  },

  plugins: [require("daisyui")],

  // DaisyUI Configuration
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2563eb",
          "primary-content": "#ffffff",
          secondary: "#64748b",
          accent: "#0ea5e9",
          neutral: "#0f172a",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
          "base-content": "#0f172a",
          "--rounded-box": "2rem",
          "--rounded-btn": "1rem",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#2563eb",
          "primary-content": "#ffffff",
          neutral: "#f8fafc",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          "base-content": "#f8fafc",
          "--rounded-box": "2rem",
          "--rounded-btn": "1rem",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    utils: true,
    logs: false,
  },
};

export default config;
