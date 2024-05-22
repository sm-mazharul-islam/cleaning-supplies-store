import Image from "next/image";

const TopCategoriesCard = () => {
  return (
    <div>
      <h1 className="text-4xl text-center mt-20">Top Categories</h1>
      <p
        className="text-center  
      lg:w-[600px] p-4 mx-auto"
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam sed
        itaque cumque, ullam nesciunt ipsum minus a eligendi iure quibusdam.
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
                If a dog chews shoes whose shoes does he choose?
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
              src="https://natura-sciences.com/wp-content/uploads/2013/11/produits-d-entretien.jpg"
              alt=""
            ></Image>
            <div className=" absolute top-0 left-0 text-center mt-5">
              <h2 className="text-md ml-4 p-4 text-black text-start mt-[130px]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
                fuga ipsam nulla? Assumenda, officia? Nemo mollitia modi rem
                impedit quisquam!
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
              src="https://natura-sciences.com/wp-content/uploads/2013/11/produits-d-entretien.jpg"
              alt=""
            ></Image>
            <div className=" absolute top-0 left-0 text-center mt-5">
              <h2 className="text-md ml-4 p-3 text-black text-start mt-[150px] ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, ducimus.
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
              src="https://natura-sciences.com/wp-content/uploads/2013/11/produits-d-entretien.jpg"
              alt=""
            ></Image>
            <div className=" absolute top-0 left-0 text-center mt-5">
              <h2 className="text-md ml-4 p-3 text-black text-start mt-[430px]">
                Lorem ipsum dolor sit amet consectetur <br />
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
