import { updateOrderStatus } from "@/actions/order.actions";

interface Props {
  orders: any[];
}

export default function OrdersTable({ orders }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-300 bg-white shadow-md">
      <table className="w-full">
        {/* HEADER */}

        <thead className="bg-slate-100">
          <tr className="text-left text-slate-700">
            <th className="p-4">Customer</th>
            <th className="p-4">Products</th>
            <th className="p-4">Total</th>
            <th className="p-4">Shipping</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
            <th className="p-4">Update</th>
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-slate-200 align-top">
              {/* CUSTOMER */}

              <td className="p-4">
                <div>
                  <p className="font-semibold text-slate-800">
                    {order.customerName}
                  </p>

                  {order.customerEmail && (
                    <p className="text-sm text-slate-600">
                      {order.customerEmail}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-slate-500">
                    {order.customerPhone}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">{order.address}</p>
                </div>
              </td>

              {/* PRODUCTS */}

              <td className="p-4">
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                      <p className="font-medium text-slate-800">
                        {item.productName}
                      </p>

                      <p className="text-xs text-slate-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-xs text-slate-500">৳ {item.price}</p>
                    </div>
                  ))}
                </div>
              </td>

              {/* TOTAL */}

              <td className="p-4 text-slate-700">
                <p>Subtotal: ৳ {order.subtotal}</p>

                <p className="text-sm text-slate-500">
                  Shipping: ৳ {order.shipping}
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  Total: ৳ {order.total}
                </p>
              </td>

              {/* SHIPPING */}

              <td className="p-4">
                {order.shippingMethod ? (
                  <div>
                    <p className="font-medium text-slate-800">
                      {order.shippingMethod.name}
                    </p>

                    <p className="text-sm text-slate-500">৳ {order.shipping}</p>
                  </div>
                ) : (
                  <span className="text-slate-400">No Shipping</span>
                )}
              </td>

              {/* STATUS */}

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    order.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : order.status === "SHIPPED"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "PROCESSING"
                          ? "bg-purple-100 text-purple-700"
                          : order.status === "CONFIRMED"
                            ? "bg-cyan-100 text-cyan-700"
                            : order.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              {/* DATE */}

              <td className="p-4 text-sm text-slate-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              {/* UPDATE */}

              <td className="p-4">
                <form action={updateOrderStatus} className="space-y-2">
                  <input type="hidden" name="id" value={order.id} />

                  <select
                    name="status"
                    defaultValue={order.status}
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-700 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>

                  <button className="h-10 w-full rounded-lg bg-amber-500 text-sm font-semibold text-white transition hover:bg-amber-600">
                    Update
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
