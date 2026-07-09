interface Props {
  orders: any[];
}

export default function RecentOrders({ orders }: Props) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">Recent Orders</h2>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-slate-500">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-b-0"
            >
              <div>
                <p className="font-semibold text-slate-800">
                  {order.customerName}
                </p>

                <p className="text-sm text-slate-600">{order.customerPhone}</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-slate-800">
                  ৳ {order.total.toFixed(2)}
                </p>

                <p className="text-sm text-amber-600 font-medium">
                  {order.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
