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
    <div className="sticky top-28 h-fit rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="mb-8 text-3xl font-black">Order Summary</h2>

      {/* ITEMS */}

      <CheckoutItems items={items} />

      {/* TOTALS */}

      <div className="mt-8 space-y-4 border-t border-slate-800 pt-8">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Subtotal</span>
          <span>৳ {subtotal}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Shipping</span>
          <span>৳ {shippingCost}</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-5 text-2xl font-black">
          <span>Total</span>
          <span>৳ {grandTotal}</span>
        </div>
      </div>

      {/* BUTTON */}

      <button
        disabled={loading}
        onClick={handleCheckout}
        className="mt-8 h-14 w-full rounded-2xl bg-green-600 font-bold transition hover:bg-green-700 disabled:bg-slate-700"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
