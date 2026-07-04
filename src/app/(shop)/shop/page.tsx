import { prisma } from "@/lib/prisma";

import ProductCard from "@/components/shop/product/product-card";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold">Shop</h1>

          <p className="mt-2 text-slate-400">Explore all products</p>
        </div>

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
