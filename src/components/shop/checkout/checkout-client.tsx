"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cart-store";
import { createOrder } from "@/actions/order.actions";

import CheckoutForm from "./checkout-form";
import CheckoutSummary from "./checkout-summary";
import SuccessModal from "./success-modal";

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays?: string | null;
}

interface Props {
  shippingMethods: ShippingMethod[];
}

export default function CheckoutClient({ shippingMethods }: Props) {
  const router = useRouter();

  // ========================
  // CART STORE
  // ========================

  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  // ========================
  // HYDRATION
  // ========================

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ========================
  // FORM STATE
  // ========================

  const [loading, setLoading] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [selectedShippingId, setSelectedShippingId] = useState(
    shippingMethods[0]?.id || "",
  );

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // ========================
  // SHIPPING
  // ========================

  const selectedShippingMethod = useMemo(
    () => shippingMethods.find((method) => method.id === selectedShippingId),
    [shippingMethods, selectedShippingId],
  );

  const shippingCost = selectedShippingMethod?.price || 0;

  // ========================
  // TOTALS
  // ========================

  const subtotal = mounted ? totalPrice() : 0;
  const grandTotal = subtotal + shippingCost;

  // ========================
  // CHECKOUT
  // ========================

  async function handleCheckout() {
    try {
      if (items.length === 0) {
        throw new Error("Cart is empty");
      }

      if (!fullName.trim()) {
        throw new Error("Please enter your full name");
      }

      if (!phone.trim()) {
        throw new Error("Please enter your phone number");
      }

      if (!address.trim()) {
        throw new Error("Please enter your shipping address");
      }

      setLoading(true);

      const order = await createOrder({
        customerName: fullName,
        customerPhone: phone,
        customerEmail: undefined,

        address,

        shippingMethodId: selectedShippingId,

        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      clearCart();
      setSuccessOrderId(order.id);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  // ========================
  // WAIT FOR HYDRATION
  // ========================

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading checkout...
      </div>
    );
  }

  // ========================
  // UI
  // ========================

  return (
    <>
      <div className="min-h-screen bg-slate-950 px-6 pb-20 pt-32 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px]">
          <CheckoutForm
            fullName={fullName}
            setFullName={setFullName}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            selectedShippingId={selectedShippingId}
            setSelectedShippingId={setSelectedShippingId}
            shippingMethods={shippingMethods}
          />

          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            shippingCost={shippingCost}
            grandTotal={grandTotal}
            loading={loading}
            handleCheckout={handleCheckout}
          />
        </div>
      </div>

      <SuccessModal successOrderId={successOrderId} router={router} />
    </>
  );
}
