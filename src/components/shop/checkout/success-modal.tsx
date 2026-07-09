"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  successOrderId: string;
  router: AppRouterInstance;
}

export default function SuccessModal({ successOrderId, router }: Props) {
  if (!successOrderId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
        {/* SUCCESS ICON */}

        <div className="mb-6 text-center text-6xl">🎉</div>

        {/* TITLE */}

        <h2 className="text-center text-3xl font-bold text-slate-900">
          Order Placed Successfully
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Thank you for shopping with Bloom's Door.
          <br />
          We will contact you shortly to confirm your order.
        </p>

        {/* ORDER ID */}

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            Order ID
          </p>

          <p className="break-all text-center font-mono text-sm text-slate-900">
            {successOrderId}
          </p>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Please save this Order ID for future reference.
        </p>

        {/* BUTTON */}

        <button
          onClick={() => router.push("/shop")}
          className="mt-8 h-12 w-full rounded-lg bg-amber-500 font-semibold text-white transition hover:bg-amber-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
