import { products } from "@/lib/Products";
import { categories } from "@/lib/Categories";
import ProductList from "@/components/ProductList";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tag = params.tag;

  // format slug
  const formattedTag = tag.replace(/-/g, " ").toLowerCase();

  // match category  
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === formattedTag
  );

  if (!category) {
    return (
      <div className="p-10">
        <h1 className="text-2xl mb-4">Tag &quot;{tag}&quot; not found</h1>
      </div>
    );
  }

  // filter products by categoryId
  const filteredProducts = products.filter((product) =>
    product.categoryId.includes(category.id)
  );

  return (
    <div className="py-10 bg-gradient-to-b from-violet-100 via-indigo-100 to-transparent from-0% via-30% to-100%">
      <h1 className="text-2xl px-6 mb-4">{`Products with tag: ${category.name} (${filteredProducts.length})`}</h1>
      <ProductList products={filteredProducts} categories={categories} />
    </div>
  );
}
