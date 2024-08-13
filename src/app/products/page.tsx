"use client";

import FilterBy, { Filters } from "@/components/filterProducts/FilterProducts";
import FilterProducts from "@/components/filterProducts/FilterProducts";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import ProductCard from "@/components/ui/ProductsCard";
import { TProduct } from "@/types";
import { useEffect, useState } from "react";
// !

export interface Product {
  _id: string;
  image: string;
  title: string;
  description: string;
  brand: string;
  rating: number;
  originalPrice: number;
  salePrice: number;
  longDescription: string;
}

interface ApiResponse {
  data: Product[];
  total: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [],
    brand: [],
    rating: [],
    searchQuery: "",
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://cleaning-supplies-store-server.vercel.app/products?${new URLSearchParams(
        {
          brand: filters.brand.join(","),
          salePrice: filters.priceRange.join(","),
          rating: filters.rating.join(","),
          page: page.toString(),
          limit: "10", // Set your desired limit per page
        }
      )}`
    );
    const { data, total }: ApiResponse = await res.json();
    setProducts(data);
    setTotal(total);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleNextPage = () => {
    if (page * 10 < total) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <Container>
        <NavbarTwo />
        <div className="flex justify-between mt-[100px]">
          <div className="p-4 lg:p-0">
            <h1 className="text-4xl font-bold lg:ml-[360px]">
              Most Popular Products
            </h1>
            <p className="lg:w-[50%] lg:ml-[360px] text-justify">
              Protect your home from harmful germs and bacteria with GermGuard
              Disinfectant Spray. This powerful disinfectant kills 99.9% of
              viruses and bacteria on contact, ensuring a hygienic environment.
            </p>
          </div>
        </div>
        {/* grid p-[15px] grid-rows-1 lg:grid-flow-col */}
        <div className="grid p-2 lg:p-0 lg:ml-[0px] grid-rows-1 lg:grid-flow-col xl:h-[100px] ">
          <FilterProducts
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-[40px] mx-auto">
            {products.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4 lg:mt-[1300px] lg:mb-[50px] m-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 "
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            1
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleNextPage}
            disabled={page * 10 >= total}
          >
            2
          </button>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default Products;
