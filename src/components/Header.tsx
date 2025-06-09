"use client";

import { categories } from "@/lib/Categories";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import CategoryChip from "./CategoryChip";

export default function Header() {
  return (
    <>
      {/* Header */}
      <header className="flex flex-col sticky top-0 z-50 w-full px-6 sm:px-10 md:px-14 lg:px-14 xl:px-14 py-5 gap-4 bg-gradient-to-r from-violet-100 via-indigo-100 to-sky-50 items-center border-b-1 border-accent2">
        <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-12 md:gap-4 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="w-max font-dance text-gray-700 font-bold"
          >
            <h1 className="w-max text-4xl md:text-2xl lg:text-3xl">{"jin's flower collection"}</h1>
          </Link>

          {/* Search */}
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoMdSearch size={24} className="text-accent2 scale-75 md:scale-100" />
              </div>
              <input
                type="search"
                id="header-search"
                autoComplete="off"
                className="block w-full p-3 ps-10 rounded-md border-0 bg-gradient-to-l from-violet-50 via-indigo-100 to-sky-50 text-accent2 text-sm outline-1 focus:outline-2 outline-accent2"
                placeholder="Search anything..."
                required
              />
              {/* <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 px-6 py-3 border-s-4 border-white hover:bg-gray-300 rounded-e-md font-medium text-accent2"
              >
                Search
              </button> */}
            </div>
          </form>

          {/* Admin login */}
          {/* <Link href="/admin" className="px-4 py-3 bg-accent1 rounded-md text-accent2 hover:bg-gray-300 active:scale-95">
            <p>Login</p>
          </Link> */}
        </div>

        <div className="flex w-full gap-2 overflow-x-scroll">
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              name={category.name}
              redirect={`/tags/${category?.name?.toLowerCase()?.replace(/\s+/g, "-") || ""}`}
            />
          ))}
        </div>
      </header>
    </>
  );
}
