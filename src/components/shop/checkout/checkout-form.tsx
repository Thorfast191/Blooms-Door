"use client";

import ShippingSelector from "./shipping-selector";
import PaymentSelector from "./payment-selector";

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays?: string | null;
  isPickup: boolean;
}

interface Props {
  fullName: string;
  setFullName: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  address: string;
  setAddress: (value: string) => void;

  paymentMethod: string;
  setPaymentMethod: (value: string) => void;

  selectedShippingId: string;
  setSelectedShippingId: (value: string) => void;

  shippingMethods: ShippingMethod[];

  isPickup: boolean;
}

export default function CheckoutForm({
  fullName,
  setFullName,
  phone,
  setPhone,
  address,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  selectedShippingId,
  setSelectedShippingId,
  shippingMethods,
  isPickup,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="mb-10 text-4xl font-black">Checkout</h1>

      <div className="space-y-6">
        {/* NAME */}

        <div>
          <label className="mb-3 block text-sm text-slate-400">Full Name</label>

          <input
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="h-14 w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* PHONE */}

        <div>
          <label className="mb-3 block text-sm text-slate-400">
            Phone Number
          </label>

          <input
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="h-14 w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* SHIPPING */}

        <ShippingSelector
          selectedShippingId={selectedShippingId}
          setSelectedShippingId={setSelectedShippingId}
          shippingMethods={shippingMethods}
        />

        {/* ADDRESS */}

        {!isPickup && (
          <div>
            <label className="mb-3 block text-sm text-slate-400">
              Shipping Address
            </label>

            <textarea
              required
              autoComplete="street-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, Road, Area"
              rows={5}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-5 focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* PAYMENT */}

        <PaymentSelector
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>
    </div>
  );
}
