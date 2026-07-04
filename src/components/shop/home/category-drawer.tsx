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

      <div
        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* DRAWER */}

      <div className="fixed right-0 top-0 z-[100] h-screen w-full max-w-xl overflow-y-auto border-l border-white/10 bg-slate-950">
        {/* HEADER */}

        <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/90 px-8 py-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[6px] text-blue-400">
                Collection
              </p>

              <h2 className="mt-2 text-3xl font-black">{category.name}</h2>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-white/30"
            >
              ✕
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <h3 className="text-2xl font-bold">{category.name}</h3>

            <p className="mt-3 text-slate-400">
              Browse all products in this category.
            </p>

            <Link
              href={`/shop/category/${category.id}`}
              onClick={onClose}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 font-semibold transition hover:bg-blue-700"
            >
              View Products →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
