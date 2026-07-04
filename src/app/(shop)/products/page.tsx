import { prisma } from "@/lib/prisma";

import AddToCartButton from "@/components/shop/cart/add-to-cart-button";

export default async function ProductsPage() {
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
    <div className="mx-auto max-w-7xl p-10">
      <h1 className="mb-10 text-4xl font-bold text-white">Products</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-xl bg-slate-900"
          >
            {/* IMAGE */}

            {product.images.length > 0 && (
              <img
                src={product.images[0].imageUrl}
                alt={product.name}
                className="h-72 w-full object-cover"
              />
            )}

            {/* CONTENT */}

            <div className="p-4">
              <h2 className="text-xl font-bold text-white">{product.name}</h2>

              <p className="mt-2 text-slate-400">
                ৳ {product.price.toFixed(2)}
              </p>

              <div className="mt-4">
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    imageUrl: product.images[0]?.imageUrl ?? null,
                    price: product.price,
                    stock: 999, // or product.stock if you add a stock field later
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
