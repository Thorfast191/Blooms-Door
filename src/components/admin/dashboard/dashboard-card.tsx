interface Props {
  title: string;
  value: string | number;
}

export default function DashboardCard({ title, value }: Props) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-md transition hover:shadow-lg">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <h2 className="mt-4 text-4xl font-bold text-slate-800">{value}</h2>
    </div>
  );
}
