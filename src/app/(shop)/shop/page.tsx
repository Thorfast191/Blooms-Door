import { prisma } from "@/lib/prisma";

import ProductCard from "@/components/shop/product/product-card";

export default async function ShopPage() {
  // ======================================================
  // FETCH PRODUCTS
  // ======================================================

  const products = await prisma.product.findMany({
    include: {
      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-28">
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Bloom's Door Collection
          </p>

          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Shop
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Browse our complete collection and discover timeless fashion
            designed for everyday style.
          </p>
        </div>

        {/* ======================================================
            PRODUCTS GRID
        ====================================================== */}

        {products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800">
              No Products Found
            </h2>

            <p className="mt-3 text-slate-500">
              Products will appear here once they have been added from the admin
              panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  images: product.images,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
