import { prisma } from "@/lib/prisma";

import ProductCard from "@/components/shop/product/product-card";

export default async function NewArrivalsPage() {
  const products = await prisma.product.findMany({
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="mb-2 text-5xl font-black">New Arrivals</h1>

        <p className="mb-10 text-slate-400">Recently added products</p>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
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
      </div>
    </div>
  );
}
