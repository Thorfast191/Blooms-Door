import { createShippingMethod } from "@/actions/shipping.actions";

export default function ShippingForm() {
  return (
    <form
      action={createShippingMethod}
      className="rounded-2xl border border-slate-300 bg-white p-6 shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-slate-800">
        Create Shipping Method
      </h2>

      {/* NAME */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Name
        </label>

        <input
          name="name"
          required
          placeholder="Inside Dhaka"
          className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* PRICE */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Shipping Cost
        </label>

        <input
          type="number"
          name="price"
          required
          placeholder="70"
          className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* DAYS */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Estimated Delivery
        </label>

        <input
          name="estimatedDays"
          placeholder="1-2 Days"
          className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* PICKUP */}

      <label className="flex items-center gap-2 text-slate-700">
        <input type="checkbox" name="isPickup" />
        Store Pickup
      </label>

      {/* BUTTON */}

      <button className="h-12 rounded-lg bg-amber-500 px-6 font-semibold text-white transition hover:bg-amber-600">
        Create Shipping Method
      </button>
    </form>
  );
}
