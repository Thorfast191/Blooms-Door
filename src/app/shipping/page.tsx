export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 text-slate-900">
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-4 text-sm uppercase tracking-[6px] text-amber-600">
          Delivery
        </p>

        <h1 className="mb-8 text-5xl font-black">Shipping Information</h1>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 leading-8 text-slate-600 shadow-sm">
          <div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Processing Time
            </h2>

            <p>Orders are typically processed within 1 business day.</p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Delivery Time
            </h2>

            <p>
              Delivery usually takes 1–3 business days depending on your
              location.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Shipping Charges
            </h2>

            <p>
              Shipping charges are calculated during checkout based on your
              delivery location and selected shipping method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
