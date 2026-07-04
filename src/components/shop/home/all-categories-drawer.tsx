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

      <div
        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* DRAWER */}

      <div className="fixed right-0 top-0 z-[100] h-screen w-full max-w-xl overflow-y-auto border-l border-slate-800 bg-slate-950">
        {/* HEADER */}

        <div className="sticky top-0 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-8 py-6 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[6px] text-blue-400">
              Browse
            </p>

            <h2 className="mt-2 text-3xl font-black">Categories</h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-white"
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
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500 hover:bg-slate-800"
              >
                <span className="text-lg font-semibold">{category.name}</span>

                <span>→</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
