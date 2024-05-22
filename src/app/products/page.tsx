import Container from "@/components/shared/Container";
import NavbarTwo from "@/components/shared/NavbarTwo";
import ProductCard from "@/components/ui/ProductsCard";
import { TProduct } from "@/types";

const Products = async () => {
  const res = await fetch(
    "https://cleaning-supplies-store-server.vercel.app/products",
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data: products } = await res.json();

  // console.log(flashSale);

  return (
    <Container>
      <NavbarTwo />
      {/* <div className="lg:px-[150px]">
        <h1 className="text-4xl"></h1>
      </div> */}
      <div className="flex justify-between mt-[100px]">
        <div>
          <h1 className="text-4xl font-bold lg:ml-[550px]  ">
            Most Popular Products
          </h1>
          <p className="  lg:w-[50%] lg:ml-[550px]">
            Protect your home from harmful germs and bacteria with GermGuard
            Disinfectant Spray. This powerful disinfectant kills 99.9% of
            viruses and bacteria on contact, ensuring a hygienic environment.
          </p>
        </div>
        {/* <button className="btn btn-neutral lg:mr-[170px] rounded-full text-white mr-[10px] ">
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
        </button> */}
      </div>
      <div className="grid ml-[50px] grid-rows-1 lg:grid-flow-col ">
        <div className="border h-[1300px] w-[300px] card ">
          <h1 className="text-2xl text-center">Price Range</h1>
          <div className="form-control p-10">
            <label className="label cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span className="label-text font-bold  text-xl">
                $20.00 - $50.00
              </span>
            </label>
            <label className="label cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span className="label-text font-bold  text-xl">
                $20.00 - $50.00
              </span>
            </label>
            <label className="label cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span className="label-text font-bold  text-xl">
                $20.00 - $50.00
              </span>
            </label>
            <label className="label cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span className="label-text font-bold  text-xl">
                $20.00 - $50.00
              </span>
            </label>
          </div>
          <span className="divider"></span>
          <div className="">
            <h1 className="text-2xl text-center">Categories / Brands</h1>
            <ul className="menu   lg:ml-[50px]lg:menu-horizontal rounded-box  ">
              <li>
                <details open>
                  <summary>Mr. Clean</summary>
                  <ul className="justify-end items-end flex ">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
            <ul className="menu  lg:ml-[50px]lg:menu-horizontal rounded-box ">
              <li>
                <details open>
                  <summary>GermGuard</summary>
                  <ul className="justify-end items-end flex">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
            <ul className="menu  lg:ml-[50px]lg:menu-horizontal rounded-box ">
              <li>
                <details open>
                  <summary>ShineMax</summary>
                  <ul className="justify-end items-end flex">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
            <ul className="menu  lg:ml-[50px]lg:menu-horizontal rounded-box ">
              <li>
                <details open>
                  <summary>FreshWave</summary>
                  <ul className="justify-end items-end flex">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
            <ul className="menu  lg:ml-[50px]lg:menu-horizontal rounded-box ">
              <li>
                <details open>
                  <summary>FreshStep</summary>
                  <ul className="justify-end items-end flex">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
            <ul className="menu  lg:ml-[50px]lg:menu-horizontal rounded-box ">
              <li>
                <details open>
                  <summary>EcoGreen</summary>
                  <ul className="justify-end items-end flex">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <span className="divider"></span>
          <div className="form-control p-10">
            <h1 className="text-2xl  text-center">Ratings</h1>
            <label className="label cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span className="label-text font-bold  text-xl">1 Star</span>
            </label>
            <label className="label cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span className="label-text font-bold  text-xl">2 Star</span>
            </label>
            <label className="label cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span className="label-text font-bold  text-xl">3 Star</span>
            </label>
            <label className="label cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span className="label-text font-bold  text-xl">4 Star</span>
            </label>
            <label className="label cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" />
              <span className="label-text font-bold  text-xl">5 Star</span>
            </label>
          </div>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-[150px]  mx-auto">
          {products.map((item: TProduct) => (
            <ProductCard key={item._id} item={item}></ProductCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Products;
