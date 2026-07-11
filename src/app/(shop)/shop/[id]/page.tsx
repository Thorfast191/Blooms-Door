import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProductGallery from "@/components/shop/product/product-gallery";
import ProductInfo from "@/components/shop/product/product-info";
import RelatedProducts from "@/components/shop/product/related-products";

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

  // Related products from same category
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: {
        not: product.id,
      },
    },

    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },

    take: 4,
  });

  const galleryImages = product.images.map((image) => image.imageUrl);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* PRODUCT */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <ProductGallery images={galleryImages} name={product.name} />

            <ProductInfo
              product={{
                id: product.id,
                name: product.name,
                description: product.description,
                imageUrl: galleryImages[0] ?? null,
                price: product.price,
                stock: product.stock,
                category: product.category,
              }}
            />
          </div>
        </div>

        {/* RELATED PRODUCTS */}

        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}
