// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ToastContainer } from "react-toastify";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Lizel | Cleaning Supplies ",
//   description: "Cleaning Supplies App",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" data-theme="light">
//       <body className={inter.className}>{children}</body>
//       {/* <ToastContainer  position="top-right"
//   autoClose={5000}
//   hideProgressBar={false}
//   newestOnTop={false}
//   closeOnClick
//   rtl={false}
//   pauseOnFocusLoss
//   draggable
//   pauseOnHover  /> */}
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// If the CSS import still shows an error, ensure react-toastify is installed
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lizel | Cleaning Supplies ",
  description: "Cleaning Supplies App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        {/* The AuthProvider MUST wrap everything to prevent the useAuth error */}
        <AuthProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthProvider>
      </body>
    </html>
  );
}
