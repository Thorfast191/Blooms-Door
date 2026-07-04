"use client";

import { ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cart-store";

interface Props {
  product: {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    price: number;
    stock: number;
    category?: {
      name: string;
    } | null;
  };
}

export default function ProductInfo({ product }: Props) {
  const router = useRouter();

  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);

  function increaseQuantity() {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  function addProductToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity,
      stock: product.stock,
    });
  }

  function handleAddToCart() {
    addProductToCart();
  }

  function handleBuyNow() {
    addProductToCart();
    router.push("/checkout");
  }

  return (
    <div className="w-full">
      {/* CATEGORY */}

      <p className="mb-5 text-sm uppercase tracking-[6px] text-blue-400">
        {product.category?.name ?? "Products"}
      </p>

      {/* TITLE */}

      <h1 className="break-words text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
        {product.name}
      </h1>

      {/* PRICE */}

      <div className="mt-8">
        <h2 className="text-4xl font-black lg:text-5xl">
          ৳ {product.price.toFixed(2)}
        </h2>
      </div>

      {/* STOCK */}

      <div className="mt-5">
        {product.stock > 0 ? (
          <span className="font-semibold text-green-400">
            In Stock ({product.stock})
          </span>
        ) : (
          <span className="font-semibold text-red-400">Out Of Stock</span>
        )}
      </div>

      {/* DESCRIPTION */}

      <div className="mt-10">
        <h3 className="mb-4 text-2xl font-bold">Description</h3>

        <p className="whitespace-pre-line leading-8 text-slate-300">
          {product.description || "No description available."}
        </p>
      </div>

      {/* QUANTITY */}

      <div className="mt-10">
        <p className="mb-4 text-sm uppercase tracking-[4px] text-slate-400">
          Quantity
        </p>

        <div className="flex w-fit overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="h-14 w-14 text-2xl transition hover:bg-slate-800"
          >
            −
          </button>

          <div className="flex h-14 w-14 items-center justify-center text-lg font-bold">
            {quantity}
          </div>

          <button
            type="button"
            onClick={increaseQuantity}
            className="h-14 w-14 text-2xl transition hover:bg-slate-800"
          >
            +
          </button>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
          className="flex h-16 items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 font-bold transition hover:border-blue-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag size={20} />

          {product.stock > 0 ? "Add To Cart" : "Out Of Stock"}
        </button>

        <button
          type="button"
          disabled={product.stock <= 0}
          onClick={handleBuyNow}
          className="h-16 rounded-2xl bg-white font-bold text-black transition hover:bg-slate-200 disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>

      {/* FEATURES */}

      <div className="mt-12 space-y-5">
        <div className="flex items-center gap-5 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950">
            <ShieldCheck className="text-blue-400" size={24} />
          </div>

          <div>
            <h3 className="text-lg font-bold">Secure Checkout</h3>

            <p className="mt-1 text-sm text-slate-400">
              100% protected payment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950">
            <Truck className="text-blue-400" size={24} />
          </div>

          <div>
            <h3 className="text-lg font-bold">Fast Delivery</h3>

            <p className="mt-1 text-sm text-slate-400">
              Nationwide shipping available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
