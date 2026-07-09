import { requireAdmin } from "@/lib/require-admin";

import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* SIDEBAR */}

      <aside className="w-64 shrink-0 border-r border-slate-300 bg-white p-6 shadow-sm">
        <h1 className="mb-8 text-3xl font-extrabold tracking-wide text-slate-800">
          Bloom&apos;s Door
        </h1>

        <nav className="space-y-4">
          <Link
            href="/admin"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-200"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-200"
          >
            Products Management
          </Link>

          <Link
            href="/admin/categories"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-200"
          >
            Categories Management
          </Link>

          <Link
            href="/admin/orders"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-200"
          >
            Orders Management
          </Link>

          <Link
            href="/admin/shipping"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-200"
          >
            Shipping Management
          </Link>

          <Link
            href="/admin/settings"
            className="block rounded-lg px-3 py-2 transition hover:bg-slate-200"
          >
            Settings
          </Link>

          <form
            action={async () => {
              "use server";
              const { signOut } = await import("@/auth");

              await signOut({
                redirectTo: "/admin/login",
              });
            }}
          >
            <button
              type="submit"
              className="mt-10 rounded-lg px-3 py-2 text-left text-red-600 transition hover:bg-red-100 hover:text-red-700"
            >
              Logout
            </button>
          </form>
        </nav>
      </aside>

      {/* CONTENT */}

      <main className="min-w-0 flex-1 overflow-x-hidden bg-slate-100 p-8">
        {children}
      </main>
    </div>
  );
}
