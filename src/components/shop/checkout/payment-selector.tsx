interface Props {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

export default function PaymentSelector({
  paymentMethod,
  setPaymentMethod,
}: Props) {
  return (
    <div>
      {/* LABEL */}

      <label className="mb-2 block text-sm font-medium text-slate-700">
        Payment Method
      </label>

      {/* SELECT */}

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900 transition focus:border-amber-500 focus:outline-none"
      >
        <option value="COD">Cash on Delivery (COD)</option>
      </select>

      {/* NOTE */}

      <p className="mt-2 text-sm text-slate-500">
        Online payment methods will be available soon.
      </p>
    </div>
  );
}
