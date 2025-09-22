"use client";

import { products } from "@/lib/Products";
import { categories } from "@/lib/Categories";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import Link from "next/link";
import { getRandomProductId } from "@/utils/helpers.client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const randomizerClick = () => {
    const randomId = getRandomProductId();
    router.push(`/details/${randomId}`);
  };

  return (
    <div className="w-full flex flex-col items-center overflow-y-scroll">
      {/* Hero */}
      <section
        id="hero"
        className="relative w-full aspect-[3/5] md:aspect-video"
      >
        {/* Gradient */}
        <div className="absolute w-full h-full z-10 bg-gradient-to-br opacity-50 from-violet-300 to-transparent from-0% to-80%"></div>

        {/* Hero contents */}
        <div className="absolute flex flex-col w-2/3 md:w-1/2 h-5/7 md:h-4/5 lg:h-4/5 xl:h-3/5 justify-between z-20 px-8 md:px-20 pt-52 md:pt-20 lg:pt-40 xl:pt-48">
          <div className="flex flex-col w-full lg:gap-3">
            <h4 className="text-xl md:text-3xl lg:text-5xl text-accent1">
              Welcome to
            </h4>
            <h4 className="p-2 md:p-3 font-dance font-bold text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-200 to-sky-100">
              {"jin's flower collection"}
            </h4>
            <h6>*honestly idk what to add here*</h6>
          </div>

          <div className="flex flex-col sm:flex-row w-max md:items-center gap-4">
            <Link href="#product-list" scroll className="w-full">
              <button className="w-full px-3 md:px-3 lg:px-6 py-2 md:py-2 bg-accent1 hover:bg-transparent text-gray-600 whitespace-nowrap hover:text-accent1 font-medium text-xs lg:text-base border-2 border-transparent hover:border-accent1 rounded-md active:scale-95 transition duration-200">
                See Products
              </button>
            </Link>

            <button
              onClick={randomizerClick}
              className="w-full px-3 md:px-3 lg:px-6 py-2 md:py-2 bg-transparent hover:bg-accent1 border-[1.5] md:border-2 hover:border-transparent border-accent1 text-accent1 whitespace-nowrap hover:text-gray-600 font-medium text-xs lg:text-base rounded-md active:scale-95 transition duration-200"
            >
              Randomizer
            </button>
          </div>
        </div>

        {/* Hero bg image (desktop) */}
        <Image
          src="/images/static/hero-bg.png"
          alt="hero"
          fill
          className="object-cover hidden md:block"
          priority
        />

        {/* Hero bg image (mobile) */}
        <Image
          src="/images/static/hero-bg-mobile.jpg"
          alt="hero"
          fill
          className="object-cover block md:hidden"
        /> 
        
      </section>

      <section
        id="product-list"
        className="w-full flex flex-col items-center py-14 bg-gradient-to-b from-violet-100 via-indigo-100 to-transparent from-0% via-30% to-100%"
      >
        <ProductList products={products} categories={categories} />
      </section>
    </div>
  );
}
