/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}

        <label
          htmlFor="my-drawer-2"
          className="btn bg-slate-300 w-[400px]  drawer-button lg:hidden text-xl "
        >
          <span className="text-neutral-700"> Open Dashboard Nav</span>
        </label>
        {/* <DashboardLayout /> */}
        <h1 className="text-4xl border border-gray-200 p-[40px] shadow text-center font-bold text-gray-500">
          Welcome To your Dashboard
        </h1>
        <p className="p-4 items-justify shadow m-[10px] lg:m-[50px]">
          Welcome to your Command Center! You've arrived at the nerve center of
          your digital domain, where insights converge and opportunities unfold.
          This is your hub for navigating the intricacies of your online realm,
          where data becomes your compass and decisions take flight. Perched at
          this strategic juncture, you're granted access to a treasure trove of
          information, thoughtfully organized and readily available at your
          fingertips. Whether you're monitoring performance, tracking trends, or
          delving into user behavior, your Command Center empowers you with the
          tools to stay ahead of the curve. Positioned at the intersection of
          strategy and action, your Command Center serves as the epicenter of
          your operations. It's where ideas materialize, plans take shape, and
          initiatives spring to life. With each interaction, you chart a course
          toward your objectives, guided by the insights gleaned from your
          Command Center's comprehensive analytics. Yet, your Command Center is
          more than just a tool; it's a gateway to innovation. Here, you uncover
          hidden gems, unveil untapped potential, and unlock pathways to
          progress. It's where raw data transforms into actionable intelligence,
          paving the way for triumphs and breakthroughs. So, as you navigate
          your Command Center, remember that you're not merely observing data;
          you're shaping destinies. Embrace the power of information, harness
          the potential of analytics, and let your Command Center be your
          steadfast companion on the journey to success. Welcome to your Command
          Center – where opportunities abound, and every interaction propels you
          closer to your aspirations.
        </p>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full  bg-slate-300 text-xl ">
          {/* Sidebar content here */}
          <li className="mt-[50px]">
            <div className="flex gap-8">
              <svg
                className="w-[25px]  text-indigo-400 "
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                ></path>
              </svg>
              <p className="text-indigo-400 text-3xl">Dashboard</p>
            </div>
          </li>
          <span className="divider"></span>

          <li>
            <div className="flex gap-8">
              <svg
                className="w-[25px] "
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                ></path>
              </svg>
              <Link href="/dashboard/allSupply">All Supply</Link>
            </div>
          </li>
          <span className="divider"></span>

          <li className="mx-auto">
            <div>
              <Link href="/" className="flex gap-8">
                <svg
                  className="w-[25px] text-indigo-400"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  ></path>
                </svg>
                <p className="text-indigo-400">Back</p>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
