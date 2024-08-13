import Container from "@/components/shared/Container";
import { TProduct } from "@/types";
import React from "react";

const AllSupply = async () => {
  const res = await fetch(
    "https://cleaning-supplies-store-server.vercel.app/products"
  );
  const { data: allSupply } = await res.json();
  return (
    <Container>
      <div className=" p-5 lg:w-[1300px]  lg:mt-[50px] mx-auto">
        <div className="overflow-auto rounded-lg shadow hidden md:block ">
          <table className=" w-full">
            <thead>
              <tr className="text-2xl">
                <th className="w-20 text-center">Title</th>
                <th className="text-center">Brand</th>
                <th className="w-24 text-center">Price</th>

                <th className="w-32 text-center">Sale Price</th>
                <th className="w-24 text-center">Edit</th>
                <th className="w-32 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xl">
              {allSupply?.map((item: TProduct) => (
                <tr key={item._id} className="border">
                  <td className="whitespace-nowrap text-justify border ">
                    {item.title}
                  </td>
                  <td className="whitespace-nowrap text-center border">
                    {item.brand}
                  </td>
                  <td className="whitespace-nowrap text-center border">
                    <span className="font-bold">$</span>
                    {item.originalPrice}
                  </td>
                  <td className="whitespace-nowrap text-center border">
                    <span className="font-bold">$</span>
                    {item.salePrice}
                  </td>
                  <td className="whitespace-nowrap text-center border">
                    <button>
                      <svg
                        className="w-[25px] text-purple-500"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        ></path>
                      </svg>
                    </button>
                  </td>
                  <td className="whitespace-nowrap text-center border">
                    <button>
                      <svg
                        className="w-[25px] text-red-500"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden ">
          {allSupply?.map((item: TProduct) => (
            <div
              className="bg-white space-y-3 p-4 rounded-lg shadow"
              key={item._id}
            >
              <div className=" space-x-2 text-sm">
                <div></div>

                <div className=" text-gray-500">
                  <p className="text-center">Title: {item.title}</p>
                </div>
                {/* <div>...</div> */}
              </div>
              <div className="text-sm text-gray-700">
                <p className="text-center">Brand : {item.brand}</p>
              </div>
              <div className="text-center text-sm font-medium text-black">
                total: {item.salePrice}
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <div>
                  <button className=" p-[3px] border bg-blue-500 text-white">
                    Edit
                  </button>
                </div>

                <div>
                  <button className="ml-[170px] p-[4px] border border-red-500 bg-red-800 text-white">
                    Del
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Link href="/" className="flex gap-8">
        <svg
          className="w-[35px] text-indigo-400 mx-auto shadow border border-gray-100 "
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
      </Link> */}
    </Container>
  );
};

export default AllSupply;

// const AllSupply = () => {
//   return (
//     <div>
//       <h1>All Supply Page</h1>
//     </div>
//   );
// };

// export default AllSupply;
