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
            className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
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
          width={90}
          height={90}
          alt="logo1"
        />
      </div>
      <div className="navbar-center hidden lg:flex lg:mr-[115px] text-white ">
        <ul className="menu menu-horizontal px-1 text-xl ">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/categories">Category</Link>
          </li>
          <li>
            <Link href="/flashsale">Flash Sale</Link>
          </li>

          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
        <svg
          className="w-8"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          ></path>
        </svg>
      </div>
      {/* <div className="navbar-end">
        <a className="btn">Button</a>
      </div> */}
    </div>
  );
};

export default Navbar;
