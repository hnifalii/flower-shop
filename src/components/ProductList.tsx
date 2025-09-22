import ProductCard from "@/components/ProductCard";
import { Product, Category } from "@/utils/types";

type ProductListProps = {
  products: Product[];
  categories: Category[];
};

export default function ProductList({
  products,
  categories,
}: ProductListProps) {
  return (
    <div className="grid grid-cols-2 z-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-6 sm:px-28 md:px-28 lg:px-28 xl:px-28 gap-3.5">
      {products.map((product) => {
        const tags = categories
          .filter((tag) => product.categoryId.includes(tag.id))
          .map((tag) => tag.name);

        return (
          <div
            key={product.id}
            className="w-[150px] sm:w-[150px] md:w-[180px] lg:w-[200px] xl:w-[220px]"
          >
            <ProductCard product={product} tags={tags || ""} />
          </div>
        );
      })}
    </div>
  );
}
