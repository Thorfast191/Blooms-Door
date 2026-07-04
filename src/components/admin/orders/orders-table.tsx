import { updateOrderStatus } from "@/actions/order.actions";

interface Props {
  orders: any[];
}

export default function OrdersTable({ orders }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        {/* HEADER */}

        <thead className="bg-slate-950">
          <tr className="text-left">
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
            <tr key={order.id} className="border-t border-slate-800 align-top">
              {/* CUSTOMER */}
              <td className="p-4">
                <div>
                  <p className="font-semibold">{order.customerName}</p>

                  {order.customerEmail && (
                    <p className="text-sm text-slate-400">
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
                    <div key={item.id} className="rounded-lg bg-slate-950 p-2">
                      <p className="font-medium">{item.productName}</p>

                      <p className="text-xs text-slate-400">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-xs text-slate-500">৳ {item.price}</p>
                    </div>
                  ))}
                </div>
              </td>

              {/* TOTAL */}

              <td className="p-4">
                <p>Subtotal: ৳ {order.subtotal}</p>

                <p className="text-sm text-slate-400">
                  Shipping: ৳ {order.shipping}
                </p>

                <p className="mt-2 font-semibold">Total: ৳ {order.total}</p>
              </td>

              {/* PAYMENT */}
              <td className="p-4">
                {order.shippingMethod ? (
                  <div>
                    <p>{order.shippingMethod.name}</p>

                    <p className="text-sm text-slate-400">৳ {order.shipping}</p>
                  </div>
                ) : (
                  <span className="text-slate-500">No Shipping</span>
                )}
              </td>

              {/* STATUS */}

              <td className="p-4">
                <span
                  className={`font-medium ${
                    order.status === "DELIVERED"
                      ? "text-green-400"
                      : order.status === "SHIPPED"
                        ? "text-blue-400"
                        : order.status === "PROCESSING"
                          ? "text-purple-400"
                          : order.status === "CONFIRMED"
                            ? "text-cyan-400"
                            : order.status === "CANCELLED"
                              ? "text-red-400"
                              : "text-yellow-400"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              {/* DATE */}

              <td className="p-4 text-sm text-slate-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              {/* UPDATE */}

              <td className="p-4">
                <form action={updateOrderStatus} className="space-y-2">
                  <input type="hidden" name="id" value={order.id} />

                  <select
                    name="status"
                    defaultValue={order.status}
                    className="h-10 w-full rounded-lg border border-slate-800 bg-slate-950 px-3"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>

                  <button className="h-10 w-full rounded-lg bg-blue-600 text-sm hover:bg-blue-700">
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
