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
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* HEADER */}

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Customer Information
        </h2>

        <p className="mt-2 text-slate-500">
          Please fill in your delivery details.
        </p>
      </div>

      <div className="space-y-6">
        {/* NAME */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* PHONE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Phone Number
          </label>

          <input
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
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
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Shipping Address
            </label>

            <textarea
              required
              autoComplete="street-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, Road, Area, District"
              rows={5}
              className="w-full rounded-lg border border-slate-300 bg-white p-4 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
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
