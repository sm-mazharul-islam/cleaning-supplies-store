"use client";

// import { useState, ChangeEvent } from "react";

// export interface Filters {
//   brand: string[];
//   rating: string[];
//   salePrice: string[];
// }

// interface FilterProductsProps {
//   filters: Filters;
//   onFilterChange: (newFilters: Filters) => void;
// }

// const FilterProducts: React.FC<FilterProductsProps> = ({
//   filters,
//   onFilterChange,
// }) => {
//   const [localFilters, setLocalFilters] = useState<Filters>(filters);

//   const handleFilterChange = (type: keyof Filters, value: string) => {
//     const newFilters = { ...localFilters };
//     if (newFilters[type].includes(value)) {
//       newFilters[type] = newFilters[type].filter((v) => v !== value);
//     } else {
//       newFilters[type].push(value);
//     }
//     setLocalFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const handleCheckboxChange = (type: keyof Filters, value: string) => {
//     return (e: ChangeEvent<HTMLInputElement>) =>
//       handleFilterChange(type, value);
//   };

//   return (
//     <div className="border lg:h-[1000px] lg:w-[300px] card">
//       <h1 className="text-2xl text-center">Price Range</h1>
//       <div className="form-control p-10">
//         <label className="label cursor-pointer">
//           <input
//             type="checkbox"
//             onChange={handleCheckboxChange("salePrice", "5-10")}
//             className="checkbox"
//           />
//           <span className="label-text font-bold text-xl">$05.00 - $10.00</span>
//         </label>
//         <label className="label cursor-pointer">
//           <input
//             type="checkbox"
//             onChange={handleCheckboxChange("salePrice", "11-15")}
//             className="checkbox"
//           />
//           <span className="label-text font-bold text-xl">$11.00 - $15.00</span>
//         </label>
//         <label className="label cursor-pointer">
//           <input
//             type="checkbox"
//             onChange={handleCheckboxChange("salePrice", "16-20")}
//             className="checkbox"
//           />
//           <span className="label-text font-bold text-xl">$16.00 - $20.00</span>
//         </label>
//         {/* Add more price ranges as needed */}
//       </div>
//       <span className="divider"></span>
//       <div>
//         <h1 className="text-2xl text-center">Categories / Brands</h1>
//         <ul className="menu lg:ml-[50px] lg:menu-horizontal rounded-box">
//           <li>
//             <label className="label cursor-pointer">
//               <input
//                 type="checkbox"
//                 onChange={handleCheckboxChange("brand", "SparklePro")}
//                 className="checkbox"
//               />
//               <span className="label-text">SparklePro</span>
//             </label>
//           </li>
//           <li>
//             <label className="label cursor-pointer">
//               <input
//                 type="checkbox"
//                 onChange={handleCheckboxChange("brand", "GermGuard")}
//                 className="checkbox"
//               />
//               <span className="label-text">GermGuard</span>
//             </label>
//           </li>
//           {/* Add more brands as needed */}
//         </ul>
//       </div>
//       <span className="divider"></span>
//       <div className="form-control p-10">
//         <h1 className="text-2xl text-center">Ratings</h1>
//         {[1, 2, 3, 4, 5].map((rating) => (
//           <label key={rating} className="label cursor-pointer">
//             <input
//               type="checkbox"
//               onChange={handleCheckboxChange("rating", rating.toString())}
//               className="checkbox"
//             />
//             <span className="label-text font-bold text-xl">{rating} Star</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FilterProducts;

// todo

export interface Filters {
  priceRange: string[];
  brand: string[];
  rating: number[];
  searchQuery: string;
}

interface FilterProductsProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterProducts: React.FC<FilterProductsProps> = ({
  filters,
  onFilterChange,
}) => {
  const handlePriceChange = (price: string) => {
    const updatedRange = filters.priceRange.includes(price)
      ? filters.priceRange.filter((p) => p !== price)
      : [...filters.priceRange, price];
    onFilterChange({ ...filters, priceRange: updatedRange });
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand];
    onFilterChange({ ...filters, brand: updatedBrands });
  };

  const handleRatingChange = (rating: number) => {
    const updatedRatings = filters.rating.includes(rating)
      ? filters.rating.filter((r) => r !== rating)
      : [...filters.rating, rating];
    onFilterChange({ ...filters, rating: updatedRatings });
  };

  return (
    <div className="border lg:h-[800px] lg:w-[300px] card">
      <h1 className="text-2xl text-center">Price Range</h1>
      <div className="form-control p-10">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            onChange={() => handlePriceChange("05-10")}
            className="checkbox"
          />
          <span className="label-text font-bold text-xl">$05.00 - $10.00</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            onChange={() => handlePriceChange("11-15")}
            className="checkbox"
          />
          <span className="label-text font-bold text-xl">$11.00 - $1.00</span>
        </label>
        {/* Add more price ranges as needed */}
      </div>
      <span className="divider"></span>
      <div>
        <h1 className="text-2xl text-center">Categories / Brands</h1>
        <ul className="menu lg:ml-[50px] lg:menu-horizontal rounded-box">
          <li>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                onChange={() => handleBrandChange("SparklePro")}
                className="checkbox"
              />
              <span className="label-text">SparklePro</span>
            </label>
          </li>
          <li>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                onChange={() => handleBrandChange("GermGuard")}
                className="checkbox"
              />
              <span className="label-text">GermGuard</span>
            </label>
          </li>
          <li>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                onChange={() => handleBrandChange("ClearView")}
                className="checkbox"
              />
              <span className="label-text">ClearView</span>
            </label>
          </li>
          {/* Add more brands as needed */}
        </ul>
      </div>
      <span className="divider"></span>
      <h1 className="text-2xl text-center">Rating</h1>
      <div className="form-control p-10">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            onChange={() => handleRatingChange(4)}
            className="checkbox"
          />
          <span className="label-text font-bold text-xl">4 Stars</span>
        </label>
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            onChange={() => handleRatingChange(5)}
            className="checkbox"
          />
          <span className="label-text font-bold text-xl">5 Stars</span>
        </label>
      </div>
    </div>
  );
};

export default FilterProducts;

//!
