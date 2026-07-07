interface Props {
  orders: any[];
}

export default function RecentOrders({ orders }: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">Recent Orders</h2>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-slate-400">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b border-slate-800 pb-4"
            >
              <div>
                <p className="font-semibold">{order.customerName}</p>

                <p className="text-sm text-slate-400">{order.customerPhone}</p>
              </div>

              <div className="text-right">
                <p className="font-bold">৳ {order.total.toFixed(2)}</p>

                <p className="text-xs text-slate-500">{order.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
