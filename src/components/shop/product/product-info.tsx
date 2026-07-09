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
      stock: product.stock,
      quantity,
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

      <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-amber-600">
        {product.category?.name ?? "Products"}
      </p>

      {/* TITLE */}

      <h1 className="break-words text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
        {product.name}
      </h1>

      {/* PRICE */}

      <div className="mt-6">
        <h2 className="text-4xl font-bold text-slate-900">
          ৳ {product.price.toFixed(2)}
        </h2>
      </div>

      {/* STOCK */}

      <div className="mt-4">
        {product.stock > 0 ? (
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            In Stock ({product.stock})
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            Out Of Stock
          </span>
        )}
      </div>

      {/* DESCRIPTION */}

      <div className="mt-10">
        <h3 className="mb-3 text-2xl font-semibold text-slate-900">
          Description
        </h3>

        <p className="whitespace-pre-line leading-8 text-slate-600">
          {product.description || "No description available."}
        </p>
      </div>

      {/* QUANTITY */}

      <div className="mt-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Quantity
        </p>

        <div className="flex w-fit overflow-hidden rounded-lg border border-slate-300">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="h-12 w-12 bg-white text-xl text-slate-700 transition hover:bg-slate-100"
          >
            −
          </button>

          <div className="flex h-12 w-14 items-center justify-center border-x border-slate-300 bg-white text-lg font-semibold text-slate-900">
            {quantity}
          </div>

          <button
            type="button"
            onClick={increaseQuantity}
            className="h-12 w-12 bg-white text-xl text-slate-700 transition hover:bg-slate-100"
          >
            +
          </button>
        </div>
      </div>

      {/* ACTION BUTTONS */}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
          className="flex h-14 items-center justify-center gap-2 rounded-lg border border-amber-500 bg-white font-semibold text-amber-600 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag size={20} />
          {product.stock > 0 ? "Add To Cart" : "Out Of Stock"}
        </button>

        <button
          type="button"
          disabled={product.stock <= 0}
          onClick={handleBuyNow}
          className="h-14 rounded-lg bg-amber-500 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>

      {/* FEATURES */}

      <div className="mt-12 space-y-4">
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
            <ShieldCheck size={22} className="text-amber-600" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Secure Checkout</h3>

            <p className="text-sm text-slate-500">100% protected payment</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
            <Truck size={22} className="text-amber-600" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Fast Delivery</h3>

            <p className="text-sm text-slate-500">
              Nationwide shipping available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
