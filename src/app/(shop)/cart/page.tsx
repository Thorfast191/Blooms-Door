"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto mb-10 max-w-6xl">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>

        <p className="mt-2 text-slate-400">Review your items before checkout</p>
      </div>

      {items.length === 0 && (
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
          <h2 className="mb-4 text-2xl font-bold">Your cart is empty</h2>

          <p className="mb-6 text-slate-400">
            Add products to continue shopping
          </p>

          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-6 hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-6 rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={128}
                    height={128}
                    className="h-32 w-32 rounded-2xl border border-slate-800 object-cover"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950">
                    <span className="text-3xl">🛍️</span>
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{item.name}</h2>

                  <div className="mt-4">
                    <p className="text-lg font-bold">
                      ৳ {item.price.toFixed(2)}
                    </p>

                    <p className="text-sm text-slate-400">
                      Stock: {item.stock}
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Subtotal: ৳ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.productId)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="w-8 text-center text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.productId)}
                      disabled={item.quantity >= item.stock}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="self-start text-red-400 hover:text-red-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="sticky top-10 h-fit rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal</span>

                <span>৳ {totalPrice().toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Shipping</span>

                <span className="text-sm text-slate-500">
                  Calculated at checkout
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-800 pt-4 text-xl font-bold">
                <span>Estimated Total</span>

                <span>৳ {totalPrice().toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
