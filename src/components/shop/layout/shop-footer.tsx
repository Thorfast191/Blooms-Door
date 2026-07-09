import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function ShopFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-800">
      {/* TOP */}

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Bloom&apos;s Door
            </h2>

            <p className="mt-6 max-w-md leading-8 text-slate-600">
              Beautiful home décor, artificial flowers, decorative pieces,
              gifts, and lifestyle accessories carefully selected to make every
              home warm, elegant, and welcoming.
            </p>

            {/* SOCIAL */}

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.facebook.com/Poshmanstyle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-pink-500 hover:bg-pink-500 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* SHOP */}

          <div>
            <h3 className="mb-6 text-lg font-bold text-slate-900">Shop</h3>

            <div className="flex flex-col gap-4 text-slate-600">
              <Link href="/shop" className="transition hover:text-amber-600">
                All Products
              </Link>

              <Link
                href="/categories"
                className="transition hover:text-amber-600"
              >
                Categories
              </Link>

              <Link
                href="/new-arrivals"
                className="transition hover:text-amber-600"
              >
                New Arrivals
              </Link>

              <Link href="/cart" className="transition hover:text-amber-600">
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* SUPPORT */}

          <div>
            <h3 className="mb-6 text-lg font-bold text-slate-900">Support</h3>

            <div className="flex flex-col gap-4 text-slate-600">
              <Link href="/contact" className="transition hover:text-amber-600">
                Contact Us
              </Link>

              <Link
                href="/shipping"
                className="transition hover:text-amber-600"
              >
                Shipping Policy
              </Link>

              <Link href="/privacy" className="transition hover:text-amber-600">
                Privacy Policy
              </Link>

              <Link href="/terms" className="transition hover:text-amber-600">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Bloom&apos;s Door. All rights reserved.
          </p>

          <p>Beautiful Home Décor • Secure Shopping • Fast Delivery</p>
        </div>
      </div>
    </footer>
  );
}
