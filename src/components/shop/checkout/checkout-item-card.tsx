"use client";

import Image from "next/image";

interface Props {
  item: any;
}

export default function CheckoutItemCard({ item }: Props) {
  return (
    <div className="border-b border-slate-800 pb-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <Image
            src={item.imageUrl || "/placeholder.png"}
            alt={item.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-2xl object-cover"
          />

          <div>
            <p className="font-semibold">{item.name}</p>

            {/* VARIANTS */}

            <div className="mt-2 flex gap-2">
              {item.size && (
                <span className="rounded-lg bg-slate-800 px-2 py-1 text-xs">
                  Size: {item.size}
                </span>
              )}

              {item.color && (
                <span className="rounded-lg bg-slate-800 px-2 py-1 text-xs">
                  Color: {item.color}
                </span>
              )}
            </div>

            {/* QUANTITY */}

            <p className="mt-3 text-sm text-slate-400">Qty: {item.quantity}</p>

            {/* DISCOUNT */}

            {item.discountType && item.discountValue && (
              <div className="mt-2">
                <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400">
                  {item.discountType === "PERCENTAGE"
                    ? `${item.discountValue}% OFF`
                    : `৳${item.discountValue} OFF`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* PRICE */}

        <div className="text-right">
          <p className="font-bold">৳ {item.price * item.quantity}</p>

          {item.originalPrice && item.originalPrice > item.price && (
            <p className="mt-1 text-sm text-slate-500 line-through">
              ৳ {item.originalPrice * item.quantity}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
