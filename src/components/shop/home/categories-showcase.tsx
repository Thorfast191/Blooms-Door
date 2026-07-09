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
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* HEADER */}

          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Categories
            </span>

            <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
              Shop By Category
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Browse our carefully selected collections to find the perfect
              decorative pieces for your home.
            </p>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className="group rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-lg"
              >
                {/* ICON */}

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-600">
                  {category.name.charAt(0).toUpperCase()}
                </div>

                {/* NAME */}

                <h3 className="text-lg font-semibold text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500 transition group-hover:text-amber-600">
                  View Products →
                </p>
              </button>
            ))}
          </div>

          {/* BUTTON */}

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAllCategories(true)}
              className="rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white transition hover:bg-amber-600"
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
