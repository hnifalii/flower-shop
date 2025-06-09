import { products } from "@/lib/Products";
import { categories } from "@/lib/Categories";
import ProductList from "@/components/ProductList";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  const formattedTag = tag.replace(/-/g, " ").toLowerCase();

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
