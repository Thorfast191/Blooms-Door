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
    <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Recent Customers
      </h2>

      <div className="space-y-4">
        {customers.length === 0 ? (
          <p className="text-slate-500">No customers yet.</p>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="border-b border-slate-200 pb-3 last:border-b-0"
            >
              <p className="font-semibold text-slate-800">
                {customer.customerName}
              </p>

              <p className="text-sm text-slate-600">{customer.customerPhone}</p>

              {customer.customerEmail && (
                <p className="text-sm text-slate-500">
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
