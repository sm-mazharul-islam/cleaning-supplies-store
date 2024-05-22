import Container from "@/components/shared/Container";
import NavbarTwo from "@/components/shared/NavbarTwo";
import FlashSaleCard from "@/components/ui/FlashSaleCard";
import ProductCard from "@/components/ui/ProductsCard";
import { Product } from "@/types";
import Link from "next/link";
import React from "react";

const Products = async () => {
  const res = await fetch(
    "https://cleaning-supplies-store-server.vercel.app/flash-sale"
  );
  const { data: flashSale } = await res.json();

  // console.log(flashSale);
  // const cleaningSupplies = [
  //   {
  //     id: 1,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
  //     title: "Lysol Disinfectant Spray",
  //     price: "$5.99",
  //     ratings: 4.8,
  //     brandCategory: "Lysol / Disinfectants",
  //     description:
  //       "Kills 99.9% of viruses and bacteria. Suitable for hard surfaces.",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
  //     title: "Clorox Bleach",
  //     price: "$3.99",
  //     ratings: 4.7,
  //     brandCategory: "Clorox / Bleach",
  //     description:
  //       "Disinfects and whitens. Ideal for laundry and bathroom cleaning.",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
  //     title: "Swiffer WetJet Mop Starter Kit",
  //     price: "$29.99",
  //     ratings: 4.5,
  //     brandCategory: "Swiffer / Floor Cleaners",
  //     description: "All-in-one mopping system. Safe on all finished floors.",
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
  //     title: "Mr. Clean Magic Eraser",
  //     price: "$4.49",
  //     ratings: 4.6,
  //     brandCategory: "Mr. Clean / Sponges",
  //     description: "Removes tough stains and grime with water alone.",
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
  //     title: "Dawn Dish Soap",
  //     price: "$2.99",
  //     ratings: 4.9,
  //     brandCategory: "Dawn / Dishwashing",
  //     description: "Tough on grease, gentle on hands. Concentrated formula.",
  //   },
  //   {
  //     id: 6,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
  //     title: "Windex Glass Cleaner",
  //     price: "$3.49",
  //     ratings: 4.8,
  //     brandCategory: "Windex / Glass Cleaners",
  //     description: "Streak-free shine for windows and mirrors.",
  //   },
  //   {
  //     id: 7,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
  //     title: "Pledge Furniture Polish",
  //     price: "$5.49",
  //     ratings: 4.7,
  //     brandCategory: "Pledge / Furniture Polish",
  //     description: "Protects and shines wood furniture. Lemon scent.",
  //   },
  //   {
  //     id: 8,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
  //     title: "Bounty Paper Towels",
  //     price: "$7.99",
  //     ratings: 4.8,
  //     brandCategory: "Bounty / Paper Towels",
  //     description: "2x more absorbent. Quick cleanup for spills and messes.",
  //   },
  //   {
  //     id: 9,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
  //     title: "Method All-Purpose Cleaner",
  //     price: "$3.99",
  //     ratings: 4.6,
  //     brandCategory: "Method / All-Purpose Cleaners",
  //     description: "Non-toxic plant-based formula. Fresh citrus scent.",
  //   },
  //   {
  //     id: 10,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
  //     title: "O-Cedar Spin Mop",
  //     price: "$39.99",
  //     ratings: 4.7,
  //     brandCategory: "O-Cedar / Mops",
  //     description: "Easy wringing with foot pedal. Machine washable mop head.",
  //   },
  //   {
  //     id: 11,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
  //     title: "Scrubbing Bubbles Bathroom Cleaner",
  //     price: "$4.99",
  //     ratings: 4.7,
  //     brandCategory: "Scrubbing Bubbles / Bathroom Cleaners",
  //     description: "Penetrates and lifts dirt. Effective on soap scum.",
  //   },
  //   {
  //     id: 12,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
  //     title: "Hoover Carpet Cleaner Solution",
  //     price: "$19.99",
  //     ratings: 4.6,
  //     brandCategory: "Hoover / Carpet Cleaners",
  //     description: "Deep cleans and deodorizes carpets. Safe for all machines.",
  //   },
  //   {
  //     id: 13,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
  //     title: "Seventh Generation Toilet Bowl Cleaner",
  //     price: "$3.49",
  //     ratings: 4.5,
  //     brandCategory: "Seventh Generation / Toilet Cleaners",
  //     description: "Non-toxic, biodegradable formula. Fresh botanical scent.",
  //   },
  //   {
  //     id: 14,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
  //     title: "Febreze Air Freshener",
  //     price: "$4.99",
  //     ratings: 4.8,
  //     brandCategory: "Febreze / Air Fresheners",
  //     description:
  //       "Eliminates odors and freshens the air. Variety of scents available.",
  //   },
  //   {
  //     id: 15,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
  //     title: "Tide Laundry Detergent",
  //     price: "$11.99",
  //     ratings: 4.9,
  //     brandCategory: "Tide / Laundry Detergents",
  //     description: "Powerful cleaning with stain removal. Fresh scent.",
  //   },
  //   {
  //     id: 16,
  //     image:
  //       "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
  //     title: "Scotch-Brite Heavy Duty Scrub Sponges",
  //     price: "$6.99",
  //     ratings: 4.7,
  //     brandCategory: "Scotch-Brite / Sponges",
  //     description:
  //       "Ideal for tough, baked-on messes. Durable and long-lasting.",
  //   },
  // ];

  return (
    <Container>
      <NavbarTwo />
      {/* <div className="lg:px-[150px]">
        <h1 className="text-4xl"></h1>
      </div> */}
      <div className="flex justify-between mt-[100px]">
        <div>
          <h1 className="text-4xl font-bold lg:ml-[350px]  ">
            Most Popular Products
          </h1>
          <p className="  lg:w-[50%] lg:ml-[350px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit animi
            sit similique dicta reiciendis deleniti. Molestias recusandae
            consequuntur porro non.
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
        <div className="border border-red-500 h-[800px] w-[300px] card ">
          <h1 className="text-2xl font-bold text-center">Price Range</h1>
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
          <div>
            <h1 className="text-2xl font-bold text-center">
              Categories / Brands
            </h1>
            <ul className="menu  lg:ml-[50px]lg:menu-horizontal rounded-box ">
              <li>
                <details open>
                  <summary>Parent item</summary>
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
                  <summary>Parent item</summary>
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
                  <summary>Parent item</summary>
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
                  <summary>Parent item</summary>
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
                  <summary>Parent item</summary>
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
                  <summary>Parent item</summary>
                  <ul className="justify-end items-end flex">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
          <h1>Hello</h1>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-[150px]  mx-auto">
          {flashSale.map((item: Product) => (
            <ProductCard key={item._id} item={item}></ProductCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Products;
