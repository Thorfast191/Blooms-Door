"use client";

import Link from "next/link";
import Image from "next/image";

interface Props {
  onExploreClick: () => void;
}

export default function CategoryHero({ onExploreClick }: Props) {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT */}

          <div>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
              Welcome to Bloom's Door
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">
              Beautiful Home
              <br />
              Decor For Every
              <br />
              Space
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Discover elegant home décor, artificial flowers, decorative
              pieces, gifts and stylish accessories that bring warmth and beauty
              to your home.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white transition hover:bg-amber-600"
              >
                Shop Now
              </Link>

              <button
                onClick={onExploreClick}
                className="rounded-lg border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 transition hover:border-amber-500 hover:text-amber-600"
              >
                Browse Categories
              </button>
            </div>

            {/* FEATURES */}

            <div className="mt-12 flex flex-wrap gap-8 text-sm text-slate-600">
              <div>✓ Premium Quality</div>
              <div>✓ Fast Delivery</div>
              <div>✓ Cash On Delivery</div>
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1974&auto=format&fit=crop"
                alt="Home Decor"
                width={1974}
                height={1316}
                priority
                className="h-[550px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
