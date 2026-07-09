"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function ShopNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useCartStore((state) => state.items);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur"
            : "border-b border-slate-200 bg-white"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* LOGO */}

          <Link
            href="/"
            className="text-2xl font-bold text-slate-900 transition hover:text-amber-600"
          >
            Bloom&apos;s Door
          </Link>

          {/* DESKTOP MENU */}

          <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wide md:flex">
            <Link
              href="/"
              className="text-slate-700 transition hover:text-amber-600"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="text-slate-700 transition hover:text-amber-600"
            >
              Shop
            </Link>

            <Link
              href="/categories"
              className="text-slate-700 transition hover:text-amber-600"
            >
              Categories
            </Link>

            <Link
              href="/new-arrivals"
              className="text-slate-700 transition hover:text-amber-600"
            >
              New Arrivals
            </Link>
          </nav>

          {/* RIGHT */}

          <div className="flex items-center gap-5">
            <Link
              href="/cart"
              className="relative text-slate-700 transition hover:text-amber-600"
            >
              <ShoppingBag size={22} />

              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                  {items.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-slate-700 md:hidden"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white px-6 pt-24 md:hidden">
          <nav className="flex flex-col gap-8 text-2xl font-bold text-slate-800">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link href="/shop" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>

            <Link href="/categories" onClick={() => setMobileOpen(false)}>
              Categories
            </Link>

            <Link href="/new-arrivals" onClick={() => setMobileOpen(false)}>
              New Arrivals
            </Link>

            <Link href="/cart" onClick={() => setMobileOpen(false)}>
              Cart
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
