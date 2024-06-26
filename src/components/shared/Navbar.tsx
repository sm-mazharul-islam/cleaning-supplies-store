import Link from "next/link";
import React from "react";
import logo from "././../../assets/images/logo (1).png";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="products">Products</Link>
            </li>
            <li>
              <Link href="flashsale">Flash Sale</Link>
            </li>

            <li>
              <Link href="dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        {/* <a className="btn btn-ghost text-xl lg:ml-[100px]">daisyUI</a> */}
        <Image
          className="lg:ml-[100px]"
          src={logo}
          width={120}
          height={120}
          alt="logo1"
        />
      </div>
      <div className="navbar-center hidden lg:flex lg:mr-[250px] text-white ">
        <ul className="menu menu-horizontal px-1 text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/flashsale">Flash Sale</Link>
          </li>

          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
      {/* <div className="navbar-end">
        <a className="btn">Button</a>
      </div> */}
    </div>
  );
};

export default Navbar;
