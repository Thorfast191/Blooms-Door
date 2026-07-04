interface Props {
  items: any[];
}

import CheckoutItemCard from "./checkout-item-card";

export default function CheckoutItems({ items }: Props) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <CheckoutItemCard
          key={`${item.productId}-${item.variantId ?? "simple"}-${item.size ?? ""}-${item.color ?? ""}`}
          item={item}
        />
      ))}
    </div>
  );
}
