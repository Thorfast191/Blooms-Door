"use client";

import { useCartStore } from "@/store/cart-store";

interface Props {
  product: {
    id: string;
    name: string;
    imageUrl?: string | null;
    price: number;
    stock: number;
  };
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      disabled={product.stock <= 0}
      onClick={() =>
        addItem({
          productId: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          stock: product.stock,
          quantity: 1,
        })
      }
      className="h-12 w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-400"
    >
      {product.stock > 0 ? "Add To Cart" : "Out Of Stock"}
    </button>
  );
}
