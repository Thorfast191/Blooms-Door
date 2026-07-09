import { deleteShippingMethod } from "@/actions/shipping.actions";
import { Trash2 } from "lucide-react";

interface Props {
  methods: any[];
}

export default function ShippingTable({ methods }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-md">
      <table className="w-full">
        {/* HEADER */}

        <thead className="bg-slate-100">
          <tr className="text-left text-slate-700">
            <th className="p-4">Name</th>

            <th className="p-4">Cost</th>

            <th className="p-4">Delivery Time</th>

            <th className="p-4">Status</th>

            <th className="p-4">Actions</th>
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {methods.map((method) => (
            <tr
              key={method.id}
              className="border-t border-slate-200 text-slate-700"
            >
              {/* NAME */}

              <td className="p-4 font-semibold">{method.name}</td>

              {/* PRICE */}

              <td className="p-4">৳ {method.price}</td>

              {/* DAYS */}

              <td className="p-4 text-slate-500">
                {method.estimatedDays || "-"}
              </td>

              {/* STATUS */}

              <td className="p-4">
                {method.isActive ? (
                  <span className="font-medium text-green-600">Active</span>
                ) : (
                  <span className="font-medium text-red-500">Disabled</span>
                )}
              </td>

              {/* ACTIONS */}

              <td className="p-4">
                <form
                  action={async () => {
                    "use server";
                    await deleteShippingMethod(method.id);
                  }}
                >
                  <button
                    className="rounded-lg bg-red-100 p-2 text-red-500 transition hover:bg-red-200"
                    title="Delete Shipping Method"
                  >
                    <Trash2 size={18} />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
