import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lizel | Cleaning Supplies",
  description: "Premium Cleaning Supplies Inventory & Community App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed the hardcoded data-theme="light" to allow dynamic switching
    <html lang="en">
      <head>
        {/* 
          This script runs immediately before the page is painted.
          It checks localStorage for a saved theme and applies it to the <html> tag.
          This prevents the "flash" of light mode for dark mode users.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const theme = savedTheme || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  console.error("Theme initialization failed", e);
                }
              })()
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-base-100 transition-colors duration-300`}
      >
        <AuthProvider>
          {/* Main content wrapper */}
          <main>{children}</main>

          {/* Global Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored" // This will automatically adapt better to theme changes
          />
        </AuthProvider>
      </body>
    </html>
  );
}
