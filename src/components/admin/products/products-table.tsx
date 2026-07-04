"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { deleteProduct } from "@/actions/product.actions";

interface Props {
  products: any[];
}

export default function ProductsTable({ products }: Props) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="border-b border-slate-800 bg-slate-950">
          <tr>
            <th className="p-5 text-left">Image</th>
            <th className="p-5 text-left">Product</th>
            <th className="p-5 text-left">Category</th>
            <th className="p-5 text-left">Price</th>
            <th className="p-5 text-left">Description</th>
            <th className="p-5 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: any) => (
            <tr
              key={product.id}
              className="border-b border-slate-800 last:border-0"
            >
              {/* Image */}
              <td className="p-5">
                {product.images?.length ? (
                  <Image
                    src={product.images[0].imageUrl}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-xl bg-slate-800" />
                )}
              </td>

              {/* Product */}
              <td className="p-5">
                <h3 className="font-semibold">{product.name}</h3>
              </td>

              {/* Category */}
              <td className="p-5">{product.category?.name ?? "-"}</td>

              {/* Price */}
              <td className="p-5 font-semibold">৳ {product.price}</td>

              {/* Description */}
              <td className="max-w-sm p-5">
                <p className="line-clamp-2 text-sm text-slate-400">
                  {product.description || "-"}
                </p>
              </td>

              {/* Actions */}
              <td className="p-5">
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/products/${product.id}`)}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      if (!confirm("Delete this product?")) return;

                      await deleteProduct(product.id);

                      router.refresh();
                    }}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
