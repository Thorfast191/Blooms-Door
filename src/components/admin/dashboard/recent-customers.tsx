interface Props {
  customers: {
    id: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string | null;
    createdAt: Date;
  }[];
}

export default function RecentCustomers({ customers }: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">Recent Customers</h2>

      <div className="space-y-4">
        {customers.length === 0 ? (
          <p className="text-slate-400">No customers yet.</p>
        ) : (
          customers.map((customer) => (
            <div key={customer.id} className="border-b border-slate-800 pb-3">
              <p className="font-semibold">{customer.customerName}</p>

              <p className="text-sm text-slate-400">{customer.customerPhone}</p>

              {customer.customerEmail && (
                <p className="text-xs text-slate-500">
                  {customer.customerEmail}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
