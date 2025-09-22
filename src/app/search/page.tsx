"use client";

import ProductList from "@/components/ProductList";
import { categories } from "@/lib/Categories";
import { products } from "@/lib/Products";
import { useSearchParams } from "next/navigation";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="py-10 bg-gradient-to-b from-violet-100 via-indigo-100 to-transparent from-0% via-30% to-100%">
        <h1 className="text-2xl px-6 mb-4">{`Results for: ${query} (${filteredProducts.length})`}</h1>
        <ProductList products={filteredProducts} categories={categories} />
      </div>
    </>
  );
}
