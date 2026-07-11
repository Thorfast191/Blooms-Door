"use client";

import Link from "next/link";

import ProductCard from "../product/product-card";

interface Props {
  products: any[];
}

export default function FeaturedCollection({ products }: Props) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}

        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            Our Products
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Latest Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Browse our newest home décor and lifestyle products, carefully
            selected to bring style and comfort into your home.
          </p>
        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* BUTTON */}

        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-8 py-3 font-semibold text-white transition hover:bg-amber-600"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
