interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays?: string | null;
  isPickup: boolean;
}

interface Props {
  selectedShippingId: string;
  setSelectedShippingId: (value: string) => void;
  shippingMethods: ShippingMethod[];
}

export default function ShippingSelector({
  selectedShippingId,
  setSelectedShippingId,
  shippingMethods,
}: Props) {
  return (
    <div>
      <label className="mb-3 block text-sm text-slate-400">
        Shipping Method
      </label>

      <select
        value={selectedShippingId}
        onChange={(e) => setSelectedShippingId(e.target.value)}
        className="h-14 w-full rounded-2xl border border-slate-800 bg-slate-950 px-5"
      >
        {shippingMethods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.name}
            {method.isPickup ? " (Store Pickup)" : ` • ৳ ${method.price}`}
            {method.estimatedDays ? ` • ${method.estimatedDays}` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
