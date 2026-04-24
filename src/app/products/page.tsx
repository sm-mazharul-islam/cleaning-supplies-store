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
      // লোকালহোস্টের জন্য একটি সেফ ফলব্যাক ইউআরএল ব্যবহার করা হয়েছে
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // শুধুমাত্র ভ্যালু থাকলে সেগুলোকে কুয়েরি প্যারামিটার হিসেবে পাঠানো
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

      const res = await fetch(`${baseUrl}/products?${params.toString()}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const result: ApiResponse = await res.json();

      // ডাটা সেফলি সেট করা
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
    <>
      <Container>
        <NavbarTwo />
        <div className="flex justify-between mt-[100px]">
          <div className="p-4 lg:p-0">
            <h1 className="text-4xl text-blue-600 font-bold lg:ml-[360px]">
              Most Popular Products
            </h1>
            <p className="lg:w-[50%] lg:ml-[360px] text-justify text-gray-600">
              Protect your home from harmful germs and bacteria with GermGuard
              Disinfectant Spray. This powerful disinfectant kills 99.9% of
              viruses and bacteria on contact, ensuring a hygienic environment.
            </p>
          </div>
        </div>

        <div className="grid p-2 lg:p-0 grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
          {/* Sidebar / Filter Section */}
          <div className="lg:col-span-1">
            <FilterProducts
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Products Grid Section */}
          <div className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto">
                {products.map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-xl text-gray-500">No products found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center items-center mt-10 mb-20 gap-4">
          <button
            className={`px-6 py-2 rounded font-medium ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="font-semibold">Page {page}</span>
          <button
            className={`px-6 py-2 rounded font-medium ${
              page * 10 >= total
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={handleNextPage}
            disabled={page * 10 >= total}
          >
            Next
          </button>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default Products;
