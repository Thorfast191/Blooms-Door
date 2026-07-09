import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CategoriesPage() {
  // ======================================================
  // FETCH CATEGORIES
  // ======================================================

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-28">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Browse Collection
          </p>

          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Shop By Category
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Explore our collections and find exactly what you're looking for.
          </p>
        </div>

        {/* ======================================================
            CATEGORIES GRID
        ====================================================== */}

        {categories.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800">
              No Categories Found
            </h2>

            <p className="mt-3 text-slate-500">
              Categories will appear here after they are created in the admin
              panel.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href="/shop"
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-lg"
              >
                <h2 className="text-2xl font-bold text-slate-800 transition group-hover:text-amber-600">
                  {category.name}
                </h2>

                <p className="mt-3 text-slate-500">
                  {category._count.products} Product
                  {category._count.products !== 1 ? "s" : ""}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-wide text-amber-600">
                    View Collection
                  </span>

                  <span className="text-xl transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
