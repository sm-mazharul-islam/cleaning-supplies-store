import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Consistent Spacing System (8px Grid)
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },

      // 2. Unified Border Radius System
      borderRadius: {
        card: "2rem", // For main category/product cards
        btn: "1rem", // For action buttons (rounded-2xl)
        input: "0.75rem", // For form fields (rounded-xl)
        dropdown: "1.25rem",
      },

      // 3. Typography & Gradients
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // Custom color alias for blue-600
      colors: {
        primaryBlue: "#2563eb",
      },
    },
  },

  plugins: [require("daisyui")],

  // 4. DaisyUI Configuration for Accessibility & Contrast
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2563eb",
          "primary-content": "#ffffff",
          secondary: "#64748b",
          accent: "#0ea5e9",
          neutral: "#0f172a", // Dark for high-contrast elements
          "base-100": "#ffffff", // Pure white for backgrounds
          "base-200": "#f8fafc", // Off-white for section breaks
          "base-300": "#f1f5f9", // Divider/Border base
          "base-content": "#0f172a", // Dark slate for text
          "--rounded-box": "2rem",
          "--rounded-btn": "1rem",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#2563eb",
          "primary-content": "#ffffff",
          neutral: "#f8fafc", // Light for high-contrast elements
          "base-100": "#0f172a", // Deep slate background
          "base-200": "#1e293b", // Lighter slate for cards
          "base-300": "#334155", // Border base for dark mode
          "base-content": "#f8fafc", // Light gray for readability
          "--rounded-box": "2rem",
          "--rounded-btn": "1rem",
        },
      },
    ],
    darkTheme: "dark", // Default system dark theme
    base: true,
    utils: true,
    logs: false,
  },
};

export default config;
