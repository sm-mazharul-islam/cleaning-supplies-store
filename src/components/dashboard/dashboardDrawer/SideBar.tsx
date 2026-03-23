import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
} from "react-icons/fa";

interface DashboardProps {
  children: ReactNode;
}

const DashboardSideBar: React.FC<DashboardProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // To highlight the active link

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Profile", href: "/dashboard/profile", icon: FaUser },
    { name: "All Supply", href: "/dashboard/allSupply", icon: FaHome },
    { name: "Analytics", href: "/dashboard/analytics", icon: FaChartLine },
    { name: "Settings", href: "/dashboard/settings", icon: FaCog },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-all duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-xl font-black">D</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                Cleaning Supplies
              </h2>
            </div>
            <button
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg"
              onClick={toggleSidebar}
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Main Menu
            </p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`text-lg ${isActive ? "text-white" : "group-hover:scale-110 transition-transform"}`}
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Action */}
          <div className="p-6 mt-auto border-t border-slate-800">
            <button className="flex w-full items-center gap-4 py-3 px-4 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors">
              <FaSignOutAlt />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={toggleSidebar}
          >
            <FaBars size={22} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-slate-900">Alex Johnson</p>
              <p className="text-xs text-slate-500">Premium Member</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Alex+Johnson"
                alt="avatar"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSideBar;
