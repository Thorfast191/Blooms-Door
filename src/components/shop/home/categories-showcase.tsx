"use client";

import { useState } from "react";

import CategoryDrawer from "./category-drawer";
import AllCategoriesDrawer from "./all-categories-drawer";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
}

export default function CategoriesShowcase({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [showAllCategories, setShowAllCategories] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden py-28">
        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 bg-blue-500/10 blur-[220px]" />

          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-purple-500/10 blur-[180px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* HEADER */}

          <div className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[8px] text-blue-400">
              Collections
            </p>

            <h2 className="mt-4 text-5xl font-black lg:text-6xl">
              Shop By Category
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-400">
              Discover curated collections crafted for every style and occasion.
            </p>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className="group relative h-44 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:bg-white/[0.05]"
              >
                {/* GLOW */}

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* LETTER */}

                <div className="absolute right-4 top-2 text-[6rem] font-black leading-none text-white/[0.04] transition duration-500 group-hover:scale-110 group-hover:text-blue-400/[0.08]">
                  {category.name.charAt(0)}
                </div>

                {/* CONTENT */}

                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <h3 className="text-lg font-black uppercase tracking-[3px] lg:text-xl">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 transition group-hover:text-slate-300">
                    View Products →
                  </p>
                </div>

                {/* LINE */}

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* BUTTON */}

          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setShowAllCategories(true)}
              className="flex h-14 items-center justify-center rounded-full bg-white px-10 font-semibold text-black transition-all duration-300 hover:scale-105"
            >
              View All Categories
            </button>
          </div>
        </div>
      </section>

      <CategoryDrawer
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />

      <AllCategoriesDrawer
        open={showAllCategories}
        categories={categories}
        onClose={() => setShowAllCategories(false)}
      />
    </>
  );
}
