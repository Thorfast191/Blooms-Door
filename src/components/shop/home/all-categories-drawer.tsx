"use client";

import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  categories: Category[];
  onClose: () => void;
}

export default function AllCategoriesDrawer({
  open,
  categories,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <>
      {/* BACKDROP */}

      <div className="fixed inset-0 z-[90] bg-black/40" onClick={onClose} />

      {/* DRAWER */}

      <div className="fixed right-0 top-0 z-[100] h-screen w-full max-w-md overflow-y-auto bg-white shadow-2xl">
        {/* HEADER */}

        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[4px] text-amber-600">
              Browse
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Categories
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* CATEGORY LIST */}

        <div className="space-y-4 p-8">
          {categories.length === 0 ? (
            <p className="text-slate-500">No categories available.</p>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/category/${category.id}`}
                onClick={onClose}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 transition hover:border-amber-500 hover:bg-amber-50"
              >
                <span className="font-semibold text-slate-800">
                  {category.name}
                </span>

                <span className="text-amber-600">→</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
