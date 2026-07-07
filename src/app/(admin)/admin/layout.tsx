import { requireAdmin } from "@/lib/require-admin";

import Link from "next/link";

import { signOut } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* SIDEBAR */}

      <aside className="w-64 shrink-0 border-r border-slate-800 p-6">
        <h1 className="mb-8 text-2xl font-bold">POSHMANSTYLE</h1>

        <nav className="space-y-4">
          <Link href="/admin" className="block hover:text-blue-400">
            Dashboard
          </Link>

          <Link href="/admin/products" className="block hover:text-blue-400">
            Products Management
          </Link>

          <Link href="/admin/categories" className="block hover:text-blue-400">
            Categories Management
          </Link>

          <Link href="/admin/orders" className="block hover:text-blue-400">
            Orders Management
          </Link>

          <Link href="/admin/shipping" className="block hover:text-blue-400">
            Shipping Management
          </Link>

          <Link href="/admin/settings" className="block hover:text-blue-400">
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
              className="mt-10 text-left text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </form>
        </nav>
      </aside>

      {/* CONTENT */}

      <main className="min-w-0 flex-1 overflow-x-hidden p-8">{children}</main>
    </div>
  );
}
