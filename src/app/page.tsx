import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/Products";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center pt-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-6 sm:px-28 md:px-28 lg:px-28 xl:px-28 gap-3.5">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[180px] sm:w-[140px] md:w-[180px] lg:w-[200px] xl:w-[220px]"
          >
            <ProductCard name={product.name} imageUrl={product.imageUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}
