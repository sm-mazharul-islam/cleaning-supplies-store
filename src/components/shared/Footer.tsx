"use client";

import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* BRAND SECTION (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                <span className="text-xl font-black text-white">L</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Lizel Supplies
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Providing premium cleaning solutions for modern homes. Your
              one-stop shop for freshness and hygiene.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* NAVIGATION LINKS (6 Columns split into 3) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">
                Shop
              </h4>
              <ul className="space-y-2 text-sm font-medium">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Flash Sales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">
                Support
              </h4>
              <ul className="space-y-2 text-sm font-medium">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Order Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">
                Legal
              </h4>
              <ul className="space-y-2 text-sm font-medium">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* CONTACT INFO (3 Columns) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <p className="text-sm">
                  123 Cleaning St, Dhaka,
                  <br />
                  Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <p className="text-sm">support@lizel.io</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-bold">Lizel Supplies</span>. All
            Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">
                VISA
              </div>
              <div className="w-8 h-5 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">
                MC
              </div>
              <div className="w-8 h-5 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">
                COD
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
