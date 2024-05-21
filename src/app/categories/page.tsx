import TopCategoriesCard from "@/components/ui/TopCategoriesCard";
import React from "react";

export const metadata = {
  title: "Categories",
};

const Categories = () => {
  const cleaningSupplies = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
      title: "Lysol Disinfectant Spray",
      price: "$5.99",
      ratings: 4.8,
      brandCategory: "Lysol / Disinfectants",
      description:
        "Kills 99.9% of viruses and bacteria. Suitable for hard surfaces.",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
      title: "Clorox Bleach",
      price: "$3.99",
      ratings: 4.7,
      brandCategory: "Clorox / Bleach",
      description:
        "Disinfects and whitens. Ideal for laundry and bathroom cleaning.",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-photo/beautiful-smiling-young-woman-wearing-black-hat-head_23-2148028516.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1715904000&semt=ais_user",
      title: "Swiffer WetJet Mop Starter Kit",
      price: "$29.99",
      ratings: 4.5,
      brandCategory: "Swiffer / Floor Cleaners",
      description: "All-in-one mopping system. Safe on all finished floors.",
    },
    {
      id: 4,
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
      title: "Mr. Clean Magic Eraser",
      price: "$4.49",
      ratings: 4.6,
      brandCategory: "Mr. Clean / Sponges",
      description: "Removes tough stains and grime with water alone.",
    },
    {
      id: 5,
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg",
      title: "Dawn Dish Soap",
      price: "$2.99",
      ratings: 4.9,
      brandCategory: "Dawn / Dishwashing",
      description: "Tough on grease, gentle on hands. Concentrated formula.",
    },
    {
      id: 6,
      image: "link6",
      title: "Windex Glass Cleaner",
      price: "$3.49",
      ratings: 4.8,
      brandCategory: "Windex / Glass Cleaners",
      description: "Streak-free shine for windows and mirrors.",
    },
    {
      id: 7,
      image: "link7",
      title: "Pledge Furniture Polish",
      price: "$5.49",
      ratings: 4.7,
      brandCategory: "Pledge / Furniture Polish",
      description: "Protects and shines wood furniture. Lemon scent.",
    },
    {
      id: 8,
      image: "link8",
      title: "Bounty Paper Towels",
      price: "$7.99",
      ratings: 4.8,
      brandCategory: "Bounty / Paper Towels",
      description: "2x more absorbent. Quick cleanup for spills and messes.",
    },
    {
      id: 9,
      image: "link9",
      title: "Method All-Purpose Cleaner",
      price: "$3.99",
      ratings: 4.6,
      brandCategory: "Method / All-Purpose Cleaners",
      description: "Non-toxic plant-based formula. Fresh citrus scent.",
    },
    {
      id: 10,
      image: "link10",
      title: "O-Cedar Spin Mop",
      price: "$39.99",
      ratings: 4.7,
      brandCategory: "O-Cedar / Mops",
      description: "Easy wringing with foot pedal. Machine washable mop head.",
    },
    {
      id: 11,
      image: "link11",
      title: "Scrubbing Bubbles Bathroom Cleaner",
      price: "$4.99",
      ratings: 4.7,
      brandCategory: "Scrubbing Bubbles / Bathroom Cleaners",
      description: "Penetrates and lifts dirt. Effective on soap scum.",
    },
    {
      id: 12,
      image: "link12",
      title: "Hoover Carpet Cleaner Solution",
      price: "$19.99",
      ratings: 4.6,
      brandCategory: "Hoover / Carpet Cleaners",
      description: "Deep cleans and deodorizes carpets. Safe for all machines.",
    },
    {
      id: 13,
      image: "link13",
      title: "Seventh Generation Toilet Bowl Cleaner",
      price: "$3.49",
      ratings: 4.5,
      brandCategory: "Seventh Generation / Toilet Cleaners",
      description: "Non-toxic, biodegradable formula. Fresh botanical scent.",
    },
    {
      id: 14,
      image: "link14",
      title: "Febreze Air Freshener",
      price: "$4.99",
      ratings: 4.8,
      brandCategory: "Febreze / Air Fresheners",
      description:
        "Eliminates odors and freshens the air. Variety of scents available.",
    },
    {
      id: 15,
      image: "link15",
      title: "Tide Laundry Detergent",
      price: "$11.99",
      ratings: 4.9,
      brandCategory: "Tide / Laundry Detergents",
      description: "Powerful cleaning with stain removal. Fresh scent.",
    },
    {
      id: 16,
      image: "link16",
      title: "Scotch-Brite Heavy Duty Scrub Sponges",
      price: "$6.99",
      ratings: 4.7,
      brandCategory: "Scotch-Brite / Sponges",
      description:
        "Ideal for tough, baked-on messes. Durable and long-lasting.",
    },
  ];
  return (
    <div>
      <h1 className="text-6xl text-center ">This is Categories page</h1>
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default Categories;
