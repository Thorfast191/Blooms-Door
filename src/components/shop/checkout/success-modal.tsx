"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  successOrderId: string;
  router: AppRouterInstance;
}

export default function SuccessModal({ successOrderId, router }: Props) {
  if (!successOrderId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
        <div className="mb-5 text-7xl">🎉</div>

        <h2 className="mb-4 text-4xl font-black">Order Placed Successfully</h2>

        <p className="mb-8 text-slate-400">
          Thank you for your order. We will contact you shortly to confirm it.
        </p>

        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <p className="mb-2 text-xs text-slate-500">ORDER ID</p>

          <p className="break-all font-mono text-sm">{successOrderId}</p>
        </div>

        <p className="mb-8 text-sm text-slate-500">
          Please save your Order ID for future reference.
        </p>

        <button
          onClick={() => router.push("/shop")}
          className="h-12 w-full rounded-xl bg-blue-600 font-semibold transition hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
