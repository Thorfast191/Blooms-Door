import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProductCard from "@/components/shop/product/product-card";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId: id,
    },
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
          <h1 className="text-5xl font-bold">{category.name}</h1>

          <p className="mt-2 text-slate-400">
            {products.length} Product{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
            No products found.
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
