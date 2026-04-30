"use client";

import FilterProducts, {
  Filters,
} from "@/components/filterProducts/FilterProducts";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import ProductCard from "@/components/ui/ProductsCard";
import { useEffect, useState } from "react";

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
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const params = new URLSearchParams();
      if (filters.brand.length > 0)
        params.append("brand", filters.brand.join(","));
      if (filters.priceRange.length > 0)
        params.append("salePrice", filters.priceRange.join(","));
      if (filters.rating.length > 0)
        params.append("rating", filters.rating.join(","));
      if (filters.searchQuery)
        params.append("searchQuery", filters.searchQuery);
      params.append("page", page.toString());
      params.append("limit", "10");

      const res = await fetch(
        `${baseUrl}/api/v1/products?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const result: ApiResponse = await res.json();

      setProducts(result.data || []);
      setTotal(result.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page * 10 < total) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-base-200 transition-colors duration-300 min-h-screen">
      <NavbarTwo />
      <Container>
        {/* Title Section */}
        <div className="flex justify-between pt-24">
          <div className="p-4 lg:p-0">
            <h1 className="text-4xl text-blue-600 font-black lg:ml-[360px] tracking-tight">
              Most Popular <span className="text-base-content">Products</span>
            </h1>
            <p className="lg:w-[50%] lg:ml-[360px] text-justify text-base-content opacity-70 mt-4 leading-relaxed font-medium">
              Protect your home from harmful germs and bacteria with GermGuard
              Disinfectant Spray. This powerful disinfectant kills 99.9% of
              viruses and bacteria on contact, ensuring a hygienic environment.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid p-2 lg:p-0 grid-cols-1 lg:grid-cols-4 gap-8 mt-12 pb-20">
          {/* Sidebar / Filter Section - Uses dynamic bg-base-100 inside component */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <FilterProducts
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Products Grid Section */}
          <div className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-96 bg-base-100 rounded-[2rem] border-2 border-dashed border-base-content/10">
                <p className="text-xl text-base-content opacity-50 font-bold">
                  No products found.
                </p>
              </div>
            )}

            {/* Pagination Buttons */}
            <div className="flex justify-center items-center mt-16 gap-6">
              <button
                className={`btn rounded-2xl px-8 transition-all active:scale-95 ${
                  page === 1
                    ? "btn-disabled opacity-30"
                    : "btn-primary shadow-lg shadow-blue-600/20"
                }`}
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Prev
              </button>

              <div className="bg-base-100 px-6 py-2 rounded-2xl border border-base-content/5 shadow-sm">
                <span className="font-black text-base-content tracking-widest uppercase text-xs">
                  Page {page}
                </span>
              </div>

              <button
                className={`btn rounded-2xl px-8 transition-all active:scale-95 ${
                  page * 10 >= total
                    ? "btn-disabled opacity-30"
                    : "btn-primary shadow-lg shadow-blue-600/20"
                }`}
                onClick={handleNextPage}
                disabled={page * 10 >= total}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </Container>
    </div>
  );
};

export default Products;
