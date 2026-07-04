"use client";

import Image from "next/image";
import Link from "next/link";

import ProductCard from "../product/product-card";

interface Props {
  products: any[];
}

export default function FeaturedCollection({ products }: Props) {
  return (
    <section className="relative overflow-hidden py-28">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-20 h-[500px] w-[500px] bg-blue-500/10 blur-[180px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-purple-500/10 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}

        <div className="mb-14">
          <p className="text-sm uppercase tracking-[8px] text-blue-400">
            Featured Collection
          </p>

          <h2 className="mt-5 text-5xl font-black leading-none lg:text-6xl">
            Spring / Summer
            <br />
            Collection
          </h2>

          <p className="mt-6 max-w-2xl text-slate-400">
            Curated essentials and statement pieces crafted for modern fashion.
          </p>
        </div>

        {/* LAYOUT */}

        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          {/* FEATURE BANNER */}

          <div className="group relative min-h-[580px] overflow-hidden rounded-[40px] border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070&auto=format&fit=crop"
              alt="Featured Collection"
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            {/* OVERLAYS */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition duration-700 group-hover:opacity-100" />

            {/* CONTENT */}

            <div className="absolute bottom-8 left-8 right-8 rounded-[32px] border border-white/10 bg-black/30 p-8 backdrop-blur-xl lg:max-w-xl">
              <p className="text-sm uppercase tracking-[8px] text-blue-400">
                Featured Collection
              </p>

              <h3 className="mt-4 text-4xl font-black leading-tight lg:text-5xl">
                Essentials
                <br />
                For The Modern
                <br />
                Wardrobe
              </h3>

              <p className="mt-5 leading-7 text-slate-300">
                Premium fabrics, relaxed silhouettes and timeless pieces
                designed for everyday luxury.
              </p>

              <Link
                href="/shop"
                className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 font-semibold text-black transition-all duration-300 hover:scale-105"
              >
                Explore Collection
              </Link>
            </div>
          </div>

          {/* PRODUCTS */}

          <div className="grid grid-cols-2 gap-6">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="relative rounded-3xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition-all duration-500 hover:opacity-100" />

                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
