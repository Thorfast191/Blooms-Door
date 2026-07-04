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
      <label className="mb-3 block text-sm text-slate-400">
        Payment Method
      </label>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="h-14 w-full rounded-2xl border border-slate-800 bg-slate-950 px-5"
      >
        <option value="COD">Cash on Delivery (COD)</option>
      </select>

      <p className="mt-2 text-sm text-slate-500">
        Online payment methods will be available soon.
      </p>
    </div>
  );
}
