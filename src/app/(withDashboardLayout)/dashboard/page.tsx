// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import NavbarTwo from "@/components/shared/NavbarTwo";
// import Footer from "@/components/shared/Footer";
// import Container from "@/components/shared/Container";

// const Dashboard = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // 1. Check for the token in localStorage
//     const token = localStorage.getItem("token");

//     if (!token) {
//       // 2. If no token, redirect to login page
//       router.push("/login");
//     } else {
//       // 3. If token exists, stop the loading state and show content
//       setIsLoading(false);
//     }
//   }, [router]);

//   // Loading state to prevent "flashing" of private content before redirect
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
//         <div className="flex flex-col items-center gap-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//             Verifying Access...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
//       <NavbarTwo />

//       <main className="flex-grow py-20">
//         <Container>
//           {/* Main Dashboard Card */}
//           <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800">
//             <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
//               <div>
//                 <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-widest text-blue-600 bg-blue-600/5 border border-blue-600/10 rounded-full uppercase">
//                   Private Access
//                 </span>
//                 <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
//                   User <span className="text-blue-600">Dashboard</span>
//                 </h1>
//               </div>
//             </header>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Placeholder Stats or Info Cards */}
//               <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
//                   Account Status
//                 </p>
//                 <p className="text-2xl font-black text-slate-900 dark:text-white uppercase">
//                   Verified
//                 </p>
//               </div>
//               {/* Additional dashboard content goes here */}
//             </div>
//           </div>
//         </Container>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";

export default function Dashboard() {
  return <div className="bg-white dark:bg-blue-900">Dashboard</div>;
}
