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
      {/* LABEL */}

      <label className="mb-2 block text-sm font-medium text-slate-700">
        Shipping Method
      </label>

      {/* SELECT */}

      <select
        value={selectedShippingId}
        onChange={(e) => setSelectedShippingId(e.target.value)}
        className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900 transition focus:border-amber-500 focus:outline-none"
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
