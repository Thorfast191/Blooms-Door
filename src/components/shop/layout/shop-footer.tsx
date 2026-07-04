import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function ShopFooter() {
  return (
    <footer className="border-t border-slate-800 bg-black text-white">
      {/* TOP */}

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black">BloomsDoor</h2>

            <p className="mt-6 max-w-md leading-8 text-slate-400">
              Premium fashion marketplace focused on modern streetwear,
              minimalist style, and quality apparel for everyday wear.
            </p>

            {/* SOCIALS */}

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://www.facebook.com/Poshmanstyle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition hover:border-blue-500 hover:bg-blue-600"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition hover:border-pink-500 hover:bg-pink-600"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition hover:border-sky-500 hover:bg-sky-500"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition hover:border-red-500 hover:bg-red-600"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* SHOP */}

          <div>
            <h3 className="mb-6 text-lg font-bold">Shop</h3>

            <div className="flex flex-col gap-4 text-slate-400">
              <Link href="/shop" className="transition hover:text-white">
                All Products
              </Link>

              <Link
                href="/new-arrivals"
                className="transition hover:text-white"
              >
                New Arrivals
              </Link>

              <Link href="/trending" className="transition hover:text-white">
                Trending
              </Link>

              <Link href="/cart" className="transition hover:text-white">
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* SUPPORT */}

          <div>
            <h3 className="mb-6 text-lg font-bold">Support</h3>

            <div className="flex flex-col gap-4 text-slate-400">
              <Link href="/contact" className="transition hover:text-white">
                Contact Us
              </Link>

              <Link href="/shipping" className="transition hover:text-white">
                Shipping Policy
              </Link>

              <Link href="/privacy" className="transition hover:text-white">
                Privacy Policy
              </Link>

              <Link href="/terms" className="transition hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} BloomsDoor. All rights reserved.</p>

          <p>Premium Fashion • Secure Shopping • Fast Delivery</p>
        </div>
      </div>
    </footer>
  );
}
