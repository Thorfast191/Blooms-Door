"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";

import { deleteProduct } from "@/actions/product.actions";

interface Props {
  products: any[];
}

export default function ProductsTable({ products }: Props) {
  async function handleDelete(id: string) {
    const confirmed = confirm("Are you sure you want to delete this product?");

    if (!confirmed) return;

    try {
      await deleteProduct(id);
    } catch (error: any) {
      alert(error.message || "Failed to delete product.");
    }
  }

  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-300 bg-white p-12 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">No products found</h2>

        <p className="mt-3 text-slate-500">Create your first product above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-slate-200 transition hover:bg-slate-50"
              >
                {/* IMAGE */}

                <td className="px-6 py-5">
                  {product.images.length > 0 ? (
                    <Image
                      src={product.images[0].imageUrl}
                      alt={product.name}
                      width={70}
                      height={70}
                      className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-500">
                      No Image
                    </div>
                  )}
                </td>

                {/* NAME */}

                <td className="px-6 py-5">
                  <h3 className="font-semibold text-slate-800">
                    {product.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {product.description || "No description"}
                  </p>
                </td>

                {/* CATEGORY */}

                <td className="px-6 py-5">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                    {product.category?.name ?? "Uncategorized"}
                  </span>
                </td>

                {/* PRICE */}

                <td className="px-6 py-5 font-semibold text-slate-800">
                  ৳ {Number(product.price).toFixed(2)}
                </td>

                {/* STOCK */}

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                {/* ACTIONS */}

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-300 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
