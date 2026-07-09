import { getOrders } from "@/actions/order.actions";
import OrdersTable from "@/components/admin/orders/orders-table";

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search ?? "";

  const orders = await getOrders(1, search);

  return (
    <div className="space-y-10">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">Orders</h1>

        <p className="mt-2 text-slate-500">Manage customer orders</p>
      </div>

      {/* Search */}

      <form>
        <input
          name="search"
          defaultValue={search}
          placeholder="Search by order ID, customer name, phone or email..."
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-amber-500 focus:outline-none"
        />
      </form>

      {/* Table */}

      <OrdersTable orders={orders} />
    </div>
  );
}
