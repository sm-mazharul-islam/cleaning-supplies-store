import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ item }: { item: TProduct }) => {
  const { image, title, description, salePrice, originalPrice } = item;
  return (
    <div className="relative m-4 card shadow p-2">
      <Image
        src={image}
        className="rounded-3xl w-[100%] h-[390px]"
        width={500}
        height={500}
        alt="headerImage"
      />
      <div className=" absolute top-0 left-0 text-center mt-5">
        <h2 className="text-md ml-4 p-3 text-white text-start badge badge-neutral">
          -13%
        </h2>
        {/* <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Test Button
          </button> */}
      </div>
      <div className=" ml-2 ">
        <h1 className="text-xl  mb-2">{title}</h1>

        <div className="card-actions justify-between">
          <div className="card-actions  justify-start text-center">
            <del className="text-md text-gray-500">${originalPrice}</del>
            <p className="text-md font-bold"> ${salePrice}</p>
          </div>

          {/* <button className="btn btn-primary">Buy Now</button> */}
          <svg
            className="w-[35px]"
            //   data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            //   aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            ></path>
          </svg>
        </div>
      </div>
      <Link href={`/products/${item._id}`}>
        <button className="ml-[100px]">see more</button>
      </Link>
    </div>
  );
};

export default ProductCard;
