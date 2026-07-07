"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    images?: {
      imageUrl: string;
    }[];
  };
}
export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const image = product.images?.[0]?.imageUrl;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      imageUrl: image,
      price: product.price,
      stock: product.stock,
      quantity: 1,
    });
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl">
      {/* IMAGE */}

      <Link
        href={`/shop/${product.id}`}
        className="block overflow-hidden bg-slate-950"
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            width={600}
            height={800}
            className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-80 flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <ShoppingBag
              size={56}
              strokeWidth={1.5}
              className="mb-4 text-slate-600"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              No Image Available
            </p>
          </div>
        )}
      </Link>

      {/* CONTENT */}

      <div className="flex flex-1 flex-col p-6">
        <Link href={`/shop/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-blue-400">
            {product.name}
          </h3>
        </Link>

        {/* PRICE */}

        <div className="mt-5">
          <p className="text-4xl font-black tracking-tight">
            ৳ {product.price}
          </p>
        </div>

        {/* BUTTON */}

        <button
          onClick={handleAddToCart}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-black transition-all duration-300 hover:bg-blue-600 hover:text-white"
        >
          <ShoppingBag size={18} />
          Add To Cart
        </button>
      </div>
    </div>
  );
}
