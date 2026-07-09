"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ========================================= */}
      {/* PAGE HEADER */}
      {/* ========================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-28">
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Bloom's Door
          </p>

          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Shopping Cart
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Review your selected items before checkout.
          </p>
        </div>

        {/* ========================================= */}
        {/* EMPTY CART */}
        {/* ========================================= */}

        {items.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
            <ShoppingBag size={64} className="mx-auto mb-6 text-amber-500" />

            <h2 className="text-3xl font-bold text-slate-900">
              Your cart is empty
            </h2>

            <p className="mt-4 text-slate-500">
              Looks like you haven't added anything yet.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-amber-500 px-8 font-semibold text-white transition hover:bg-amber-600"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* ========================================= */}
        {/* CART */}
        {/* ========================================= */}

        {items.length > 0 && (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* ========================================= */}
            {/* ITEMS */}
            {/* ========================================= */}

            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  {/* IMAGE */}

                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={140}
                      height={140}
                      className="h-32 w-32 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-slate-100">
                      <ShoppingBag size={40} className="text-slate-400" />
                    </div>
                  )}

                  {/* DETAILS */}

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {item.name}
                      </h2>

                      <p className="mt-3 text-2xl font-bold text-slate-900">
                        ৳ {item.price.toFixed(2)}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Stock Available : {item.stock}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Item Total : ৳ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* QUANTITY */}

                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex overflow-hidden rounded-lg border border-slate-300">
                        <button
                          onClick={() => decreaseQuantity(item.productId)}
                          className="flex h-10 w-10 items-center justify-center bg-white transition hover:bg-slate-100"
                        >
                          <Minus size={16} />
                        </button>

                        <div className="flex h-10 w-12 items-center justify-center border-x border-slate-300 font-semibold text-slate-900">
                          {item.quantity}
                        </div>

                        <button
                          onClick={() => increaseQuantity(item.productId)}
                          disabled={item.quantity >= item.stock}
                          className="flex h-10 w-10 items-center justify-center bg-white transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* REMOVE */}

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="self-start rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* ========================================= */}
            {/* SUMMARY */}
            {/* ========================================= */}

            <div className="sticky top-28 h-fit rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>

                  <span className="font-semibold text-slate-900">
                    ৳ {totalPrice().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>

                  <span className="text-slate-500">Calculated at checkout</span>
                </div>

                <div className="border-t border-slate-200 pt-5">
                  <div className="flex justify-between text-xl font-bold text-slate-900">
                    <span>Total</span>

                    <span>৳ {totalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-amber-500 font-semibold text-white transition hover:bg-amber-600"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="mt-4 flex h-12 w-full items-center justify-center rounded-lg border border-slate-300 bg-white font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
