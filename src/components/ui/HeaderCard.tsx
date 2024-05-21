import Image from "next/image";

const HeaderCard = ({ item }) => {
  const { name, image, description } = item;
  return (
    <div className="relative m-4">
      <Image
        src={image}
        className="rounded-3xl w-[100%] h-[290px]"
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
        <h1 className="text-2xl text-white mb-2">If a dog chews shoes</h1>

        <div className="card-actions justify-between">
          <div className="card-actions  justify-start text-center">
            <del className="text-md text-gray-200">${100 + 250}</del>
            <p className="text-md text-white"> ${200}</p>
          </div>

          {/* <button className="btn btn-primary">Buy Now</button> */}
          <svg
            className="w-[35px] text-white"
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
    </div>
  );
};

export default HeaderCard;
