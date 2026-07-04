import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProductGallery from "@/components/shop/product/product-gallery";
import ProductInfo from "@/components/shop/product/product-info";

export const revalidate = 300;

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const galleryImages = product.images.map((image) => image.imageUrl);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={galleryImages} name={product.name} />

          <ProductInfo
            product={{
              id: product.id,
              name: product.name,
              description: product.description,
              imageUrl: galleryImages[0] ?? null,
              price: product.price,
              stock: 999, // replace with a stock field later if you add one
              category: product.category,
            }}
          />
        </div>
      </div>
    </div>
  );
}
