export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 text-slate-900">
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-4 text-sm uppercase tracking-[6px] text-amber-600">
          Legal
        </p>

        <h1 className="mb-8 text-5xl font-black">Terms & Conditions</h1>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 leading-8 text-slate-600 shadow-sm">
          <p>
            By using Bloom&apos;s Door, you agree to comply with our terms and
            conditions.
          </p>

          <p>
            Product prices, availability, and promotions may change without
            prior notice.
          </p>

          <p>
            Orders may be cancelled if fraudulent activity or pricing errors are
            detected.
          </p>

          <p>Full legal terms will be published before the official launch.</p>
        </div>
      </div>
    </div>
  );
}
