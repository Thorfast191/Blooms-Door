"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
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
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* LOGO */}

          <Link
            href="/"
            className="text-xl font-black tracking-wide lg:text-2xl"
          >
            POSHMANSTYLE
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-7 text-sm uppercase tracking-widest md:flex">
            <Link href="/" className="transition hover:text-blue-400">
              Home
            </Link>

            <Link href="/shop" className="transition hover:text-blue-400">
              Shop
            </Link>

            <Link
              href="/new-arrivals"
              className="transition hover:text-blue-400"
            >
              New Arrivals
            </Link>

            <Link href="/trending" className="transition hover:text-blue-400">
              Trending
            </Link>
          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-5">
            <Link
              href="/account"
              className="hidden transition hover:text-blue-400 md:block"
            >
              <User size={22} />
            </Link>

            <Link
              href="/cart"
              className="relative transition hover:text-blue-400"
            >
              <ShoppingBag size={22} />

              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs">
                  {items.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950 px-6 pt-24 md:hidden">
          <nav className="flex flex-col gap-8 text-2xl font-bold">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link href="/shop" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>

            <Link href="/new-arrivals" onClick={() => setMobileOpen(false)}>
              New Arrivals
            </Link>

            <Link href="/trending" onClick={() => setMobileOpen(false)}>
              Trending
            </Link>

            <Link href="/account" onClick={() => setMobileOpen(false)}>
              Account
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
