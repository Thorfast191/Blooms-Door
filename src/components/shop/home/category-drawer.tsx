"use client";

import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface Props {
  category: Category | null;
  onClose: () => void;
}

export default function CategoryDrawer({ category, onClose }: Props) {
  if (!category) return null;

  return (
    <>
      {/* BACKDROP */}

      <div className="fixed inset-0 z-[90] bg-black/40" onClick={onClose} />

      {/* DRAWER */}

      <div className="fixed right-0 top-0 z-[100] h-screen w-full max-w-md overflow-y-auto bg-white shadow-2xl">
        {/* HEADER */}

        <div className="sticky top-0 border-b border-slate-200 bg-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[4px] text-amber-600">
                Collection
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {category.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100"
            >
              ✕
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">
              {category.name}
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Browse all products available in this collection.
            </p>

            <Link
              href={`/shop/category/${category.id}`}
              onClick={onClose}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-amber-500 px-8 font-semibold text-white transition hover:bg-amber-600"
            >
              View Products →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
