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
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* HEADER */}

        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
            Category
          </span>

          <h1 className="mt-6 text-5xl font-bold text-slate-900 md:text-6xl">
            {category.name}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {products.length} Product{products.length !== 1 ? "s" : ""}{" "}
            available in this category.
          </p>
        </div>

        {/* PRODUCTS */}

        {products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white py-24 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-800">
              No Products Found
            </h2>

            <p className="mt-3 text-slate-500">
              There are currently no products in this category.
            </p>
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
    </main>
  );
}
