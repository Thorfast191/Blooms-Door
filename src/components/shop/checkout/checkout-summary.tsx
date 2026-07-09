"use client";

import CheckoutItems from "./checkout-items";

interface Props {
  items: any[];
  subtotal: number;
  shippingCost: number;
  grandTotal: number;
  loading: boolean;
  handleCheckout: () => void;
}

export default function CheckoutSummary({
  items,
  subtotal,
  shippingCost,
  grandTotal,
  loading,
  handleCheckout,
}: Props) {
  return (
    <div className="sticky top-28 h-fit rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* HEADER */}

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Order Summary</h2>

        <p className="mt-2 text-sm text-slate-500">
          Please review your order before placing it.
        </p>
      </div>

      {/* ITEMS */}

      <CheckoutItems items={items} />

      {/* TOTALS */}

      <div className="mt-8 space-y-4 border-t border-slate-200 pt-8">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Subtotal</span>

          <span className="font-medium text-slate-900">
            ৳ {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">Shipping</span>

          <span className="font-medium text-slate-900">
            ৳ {shippingCost.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-5">
          <span className="text-xl font-bold text-slate-900">Total</span>

          <span className="text-2xl font-bold text-amber-600">
            ৳ {grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* BUTTON */}

      <button
        disabled={loading}
        onClick={handleCheckout}
        className="mt-8 h-14 w-full rounded-lg bg-amber-500 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
