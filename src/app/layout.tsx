import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script"; // ১. Script কম্পোনেন্ট ইমপোর্ট করুন

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 
          ২. ইনলাইন স্ক্রিপ্টের বদলে Next.js এর Script কম্পোনেন্ট ব্যবহার করা হয়েছে।
          এটি 'beforeInteractive' স্ট্র্যাটেজি ব্যবহার করে যাতে পেজ রেন্ডার হওয়ার আগেই থিম সেট হয়।
        */}
        <Script id="theme-initializer" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const savedTheme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', savedTheme);
                // যদি আপনি Tailwind-এর 'dark' ক্লাস ব্যবহার করেন তবে নিচের লাইনটি কার্যকর হবে
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                console.error("Theme set failed:", e);
              }
            })()
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} min-h-screen bg-base-100 transition-colors duration-300`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
          </div>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
