import React from "react";

const CategoryList = () => {
  return (
    <div className="mt-5 bg-gray-100 px-5 py-2">
      <h6 className="text-xl font-medium">Categories</h6>
      <hr className="border-t mt-2" />
      <div className="flex flex-col gap-1 mt-2.5">
        {/* {allCategories.map((category) => ( */}
        {/* <button
          className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-200"
          key={category.id}
        >
          <a href={`/categories/news?category=${category.title.toLowerCase()}`} className="text-blue-500 hover:underline">
            {category.title}
          </a>
        </button>
      ))} */}
      </div>
    </div>
  );
};

export default CategoryList;
