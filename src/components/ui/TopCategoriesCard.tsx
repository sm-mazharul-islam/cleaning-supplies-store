import Image from "next/image";
import Container from "../shared/Container";

const TopCategoriesCard = () => {
  return (
    <div>
      <h1 className="text-4xl text-center mt-20">Top Categories</h1>
      <p
        className="  
      lg:w-[600px] p-4 mx-auto lg:mb-[50px] text-center text-gray-500"
      >
        Remember to always follow the instructions on the product labels and
        take necessary safety precautions, such as wearing gloves and
        ventilating the area, especially when using strong chemicals like
        bleach.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div className=" p-4 ">
          <Image
            className="h-[200px] lg:h-[530px] rounded-3xl lg:w-[350px] mx-auto"
            width={500}
            height={400}
            src="https://natura-sciences.com/wp-content/uploads/2013/11/produits-d-entretien.jpg"
            alt=""
          ></Image>

          <h2 className="text-md p-3 text-black text-center m-2">
            Versatile solution for removing grease, grime, and dirt from various
            surfaces.
          </h2>
        </div>

        <div className=" p-4  text-center ">
          <Image
            className="h-[200px] rounded-3xl lg:w-[350px] mx-auto"
            width={500}
            height={300}
            src="https://www.cleaningdepotsupply.com/cdn/shop/files/janitorial_400x.jpg?v=1614300137"
            alt=""
          ></Image>

          <h2 className="text-md p-4  text-black text-center m-2">
            Powerful disinfectant and stain remover, effective against mold and
            mildew.
          </h2>
        </div>
        <div className="p-4 text-center">
          <Image
            className="h-[200px] lg:h-[530px] rounded-3xl lg:w-[350px] "
            width={500}
            height={500}
            src="https://www.cleaningdepotsupply.com/cdn/shop/files/equipment_1_400x.jpg?v=1614300137"
            alt=""
          ></Image>

          <h2 className="text-md p-3 text-black text-center m-2 ">
            absorbent cloths for polishing surfaces.
          </h2>
        </div>
        <div className="p-4 text-center col-span-1 sm:col-span-1 md:col-start-2 lg:absolute lg:mt-[330px] lg:ml-[460px] ">
          <Image
            className="h-[200px] rounded-3xl lg:w-[350px] mx-auto"
            width={500}
            height={300}
            src="https://www.cleaningdepotsupply.com/cdn/shop/files/chemicals_400x_614d253b-1a9a-4fa2-be10-68c2944eec13_400x.png?v=1638905874"
            alt=""
          ></Image>

          <h2 className="text-md  p-3 text-black text-center m-2  ">
            Cleans various types of flooring without damaging the finish.
          </h2>
          {/* <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Test Button
            </button> */}
        </div>
      </div>

      {/* done */}

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
