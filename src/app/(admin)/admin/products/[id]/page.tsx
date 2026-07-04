import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getProductById } from "@/actions/product.actions";

import ProductForm from "@/components/admin/products/product-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold">Edit Product</h1>

        <p className="mt-2 text-slate-400">Update product information</p>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
