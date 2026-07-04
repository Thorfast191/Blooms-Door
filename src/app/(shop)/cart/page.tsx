"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, totalPrice } =
    useCartStore();

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      {/* HEADER */}

      <div className="mx-auto mb-10 max-w-6xl">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>

        <p className="mt-2 text-slate-400">Review your items before checkout</p>
      </div>

      {/* EMPTY */}

      {items.length === 0 && (
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
          <h2 className="mb-4 text-2xl font-bold">Your cart is empty</h2>

          <p className="mb-6 text-slate-400">
            Add products to continue shopping
          </p>

          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-6 transition hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* CART */}

      {items.length > 0 && (
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
          {/* ITEMS */}

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId ?? "default"}`}
                className="flex gap-6 rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                {/* IMAGE */}

                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={128}
                    height={128}
                    className="h-32 w-32 rounded-2xl border border-slate-800 object-cover"
                  />
                ) : (
                  <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                        <span className="text-lg">🛍️</span>
                      </div>

                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        No Image
                      </p>
                    </div>
                  </div>
                )}

                {/* INFO */}

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{item.name}</h2>

                  {/* VARIANTS */}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.size && (
                      <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        Size: {item.size}
                      </span>
                    )}

                    {item.color && (
                      <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        Color: {item.color}
                      </span>
                    )}
                  </div>

                  {/* PRICE */}

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <p className="text-lg font-bold">৳ {item.price}</p>

                    {item.originalPrice && item.originalPrice > item.price && (
                      <p className="text-sm text-slate-500 line-through">
                        ৳ {item.originalPrice}
                      </p>
                    )}

                    {item.discountType && item.discountValue && (
                      <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400">
                        {item.discountType === "PERCENTAGE"
                          ? `${item.discountValue}% OFF`
                          : `৳${item.discountValue} OFF`}
                      </span>
                    )}
                  </div>

                  {/* ITEM SUBTOTAL */}

                  <p className="mt-2 text-sm text-slate-400">
                    Subtotal: ৳ {item.price * item.quantity}
                  </p>

                  {/* QUANTITY */}

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          `${item.productId}-${item.variantId ?? "default"}`,
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition hover:bg-slate-700"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="w-8 text-center text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          `${item.productId}-${item.variantId ?? "default"}`,
                        )
                      }
                      disabled={item.quantity >= item.stock}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition hover:bg-slate-700 disabled:bg-slate-700 disabled:text-slate-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* REMOVE */}

                <button
                  onClick={() =>
                    removeItem(
                      `${item.productId}-${item.variantId ?? "default"}`,
                    )
                  }
                  className="self-start text-red-400 transition hover:text-red-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}

          <div className="sticky top-10 h-fit rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Subtotal</span>

                <span>৳ {totalPrice()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Shipping</span>

                <span className="text-sm text-slate-500">
                  Calculated at checkout
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xl font-bold">
                <span>Estimated Total</span>

                <span>৳ {totalPrice()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 font-medium transition hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
