"use client";

import Image from "next/image";
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

        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            Featured Collection
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Featured Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Discover some of our most loved decorative pieces carefully selected
            for your home.
          </p>
        </div>

        {/* CONTENT */}

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* FEATURED BANNER */}

          <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
            <div className="relative h-[560px]">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1974&auto=format&fit=crop"
                alt="Featured Collection"
                fill
                className="object-cover transition duration-500 hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute bottom-10 left-10 max-w-md text-white">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                  New Collection
                </span>

                <h3 className="mt-6 text-4xl font-bold leading-tight">
                  Elegant Home
                  <br />
                  Decoration
                </h3>

                <p className="mt-4 text-white/90">
                  Beautiful handcrafted décor designed to make every room feel
                  warm and welcoming.
                </p>

                <Link
                  href="/shop"
                  className="mt-8 inline-flex rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* PRODUCTS */}

          <div className="grid grid-cols-2 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
