import Link from "next/link";
import React, { ReactNode, useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

interface DashboardProps {
  children: ReactNode;
}

const DashboardSideBar: React.FC<DashboardProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar Component */}

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0 z-30 w-64 transition-transform duration-300 ease-in-out bg-gradient-to-b from-blue-600 to-blue-800 p-6 shadow-xl`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl font-bold">Dashboard</h2>

          <button className="text-white lg:hidden" onClick={toggleSidebar}>
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="mt-8">
          <Link
            href="/dashboard/allSupply"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white"
          >
            <FaHome className="mr-3" />
            Home
          </Link>
          <hr />
          <Link
            href="#"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white"
          >
            <FaUser className="mr-3" />
            Profile
          </Link>
          <hr />
          <Link
            href="#"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white"
          >
            <FaCog className="mr-3" />
            Settings
          </Link>
          <hr />
          <Link
            href="#"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 text-white"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </Link>
        </nav>
      </div>
      {/* Main Content */}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex items-center justify-between lg:justify-end">
          <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
            <FaBars size={20} />
          </button>
          <h1 className="text-xl font-bold hidden lg:block">Dashboard</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardSideBar;
