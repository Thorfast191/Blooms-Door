"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createProduct, updateProduct } from "@/actions/product.actions";

import ProductImageUpload from "./product-image-upload";

interface Props {
  categories: {
    id: string;
    name: string;
  }[];

  product?: any;
}

export default function ProductForm({ categories, product }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<string[]>(
    product?.images?.map((image: any) => image.imageUrl) ?? [],
  );

  async function action(formData: FormData) {
    try {
      setLoading(true);

      if (product) {
        await updateProduct(formData);
      } else {
        await createProduct(formData);
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={action}
      className="space-y-6 rounded-3xl border border-slate-300 bg-white p-8 shadow-md"
    >
      {product && <input type="hidden" name="id" value={product.id} />}

      <div>
        <h2 className="text-3xl font-black text-slate-800">
          {product ? "Update Product" : "Create Product"}
        </h2>

        <p className="mt-2 text-slate-500">Manage your products</p>
      </div>

      <input
        type="text"
        name="name"
        required
        placeholder="Product Name"
        defaultValue={product?.name}
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
      />

      <textarea
        name="description"
        placeholder="Product Description"
        defaultValue={product?.description}
        className="min-h-[150px] w-full rounded-xl border border-slate-300 bg-white p-4 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
      />

      <ProductImageUpload defaultImages={images} onChange={setImages} />

      <input
        type="number"
        name="price"
        required
        step="0.01"
        defaultValue={product?.price}
        placeholder="Price"
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
      />

      <input
        type="number"
        name="stock"
        required
        step="1"
        defaultValue={product?.stock}
        placeholder="Stock"
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
      />

      <select
        name="categoryId"
        defaultValue={product?.categoryId ?? ""}
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-800 focus:border-amber-500 focus:outline-none"
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {images.map((image) => (
        <input key={image} type="hidden" name="images" value={image} />
      ))}

      <button
        disabled={loading}
        className="h-12 rounded-xl bg-amber-500 px-8 font-semibold text-white transition hover:bg-amber-600 disabled:bg-slate-300"
      >
        {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}
