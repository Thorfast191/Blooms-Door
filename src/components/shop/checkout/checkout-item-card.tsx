"use client";

import Image from "next/image";

interface Props {
  item: any;
}

export default function CheckoutItemCard({ item }: Props) {
  return (
    <div className="border-b border-slate-200 pb-5 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        {/* PRODUCT */}

        <div className="flex gap-4">
          <Image
            src={item.imageUrl || "/placeholder.png"}
            alt={item.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-xl border border-slate-200 object-cover"
          />

          <div>
            <p className="font-semibold text-slate-900">{item.name}</p>

            {/* VARIANTS */}

            <div className="mt-2 flex flex-wrap gap-2">
              {item.size && (
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                  Size: {item.size}
                </span>
              )}

              {item.color && (
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                  Color: {item.color}
                </span>
              )}
            </div>

            {/* QUANTITY */}

            <p className="mt-3 text-sm text-slate-500">Qty: {item.quantity}</p>

            {/* DISCOUNT */}

            {item.discountType && item.discountValue && (
              <div className="mt-2">
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
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
          <p className="text-lg font-bold text-slate-900">
            ৳ {(item.price * item.quantity).toFixed(2)}
          </p>

          {item.originalPrice && item.originalPrice > item.price && (
            <p className="mt-1 text-sm text-slate-400 line-through">
              ৳ {(item.originalPrice * item.quantity).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
