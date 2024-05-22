import Image from "next/image";

const TopCategoriesCard = () => {
  return (
    <div>
      <h1 className="text-4xl text-center mt-20">Top Categories</h1>
      <p
        className="text-center  
      lg:w-[600px] p-4 mx-auto lg:mb-[100px]"
      >
        Remember to always follow the instructions on the product labels and
        take necessary safety precautions, such as wearing gloves and
        ventilating the area, especially when using strong chemicals like
        bleach.
      </p>
      <div className="grid grid-rows-1 lg:grid-rows-0 lg:grid-flow-col lg:gap-2 px-4 lg:ml-[125px] ">
        <div className="row-span-3">
          <div className="relative mt-4 mb-4">
            <Image
              className="h-[530px] rounded-3xl lg:w-[350px] "
              width={500}
              height={500}
              src="https://natura-sciences.com/wp-content/uploads/2013/11/produits-d-entretien.jpg"
              alt=""
            ></Image>
            <div className=" absolute top-0 left-0 text-center mt-5">
              <h2 className="text-md ml-4 p-3 text-black text-start mt-[430px]">
                Versatile solution for removing grease, grime, and dirt from
                various surfaces.
              </h2>
              {/* <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Test Button
          </button> */}
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="  relative mb-4">
            {/* <div className="card-body"> */}
            <Image
              className="w-[400px]  rounded-3xl"
              width={500}
              height={300}
              src="https://www.cleaningdepotsupply.com/cdn/shop/files/janitorial_400x.jpg?v=1614300137"
              alt=""
            ></Image>
            <div className=" absolute top-0 left-0 text-center mt-5">
              <h2 className="text-md ml-4 p-4 text-black text-start mt-[350px]">
                Powerful disinfectant and stain remover, effective against mold
                and mildew.
              </h2>
              {/* <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Test Button
          </button> */}
            </div>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}

            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary">Buy Now</button> */}
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className=" ">
          <div className="  relative mb-4">
            {/* <div className="card-body"> */}
            <Image
              className="w-[400px]  rounded-3xl"
              width={500}
              height={300}
              src="https://www.cleaningdepotsupply.com/cdn/shop/files/chemicals_400x_614d253b-1a9a-4fa2-be10-68c2944eec13_400x.png?v=1638905874"
              alt=""
            ></Image>
            <div className=" absolute top-0 left-0 text-center mt-5">
              <h2 className="text-md ml-4 p-3 text-black text-start mt-[350px] ">
                Cleans various types of flooring without damaging the finish.
              </h2>
              {/* <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Test Button
          </button> */}
            </div>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}

            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary">Buy Now</button> */}
            </div>
          </div>
          {/* </div> */}
        </div>

        <div className="row-span-3 lg:col-span-8">
          <div className="relative mt-4 mb-4">
            <Image
              className="h-[530px] rounded-3xl lg:w-[350px] "
              width={500}
              height={500}
              src="https://www.cleaningdepotsupply.com/cdn/shop/files/equipment_1_400x.jpg?v=1614300137"
              alt=""
            ></Image>
            <div className=" absolute top-0 left-0 text-center mt-5">
              <h2 className="text-md ml-4 p-3 text-black text-start mt-[500px]">
                absorbent cloths for polishing surfaces.
                <br />
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center m-4">
        <button className="btn btn-neutral rounded-full text-white mr-[10px] ">
          View All
          <svg
            className="w-[30px]"
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopCategoriesCard;

// grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-[150px] lg:mr-[150px] mx-auto
