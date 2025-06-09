import Image from "next/image";

type ProductCardProps = {
  name: string;
  imageUrl: string;
  tags?: string[];
};

export default function ProductCard({ name, imageUrl, tags }: ProductCardProps) {
  return (
    <div className="rounded-lg overflow-hidden h-full shadow-sm border border-accent1 bg-white">
      {/* Product Image */}
      <div className="relative w-full aspect-square">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-col p-4">
        {/* Product Name */}
        <h3 className="text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg text-gray-800 font-semibold line-clamp-1 overflow-ellipsis">
          {name}
        </h3>

          {/* Tags */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex gap-1 overflow-x-auto">
            {tags?.map((tag, index) => (
            <span key={index} className="w-max whitespace-nowrap p-1 text-xs text-gray-400 border-1 md:border-2 border-accent1 rounded-md shri">
              {tag}
            </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
