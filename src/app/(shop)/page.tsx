import { prisma } from "@/lib/prisma";

import CategoriesShowcase from "@/components/shop/home/categories-showcase";
// import FeaturedCollection from "@/components/shop/home/featured-collection";
// import NewArrivalsSection from "@/components/shop/home/new-arrivals-section";
// import BestSellersSection from "@/components/shop/home/best-sellers-section";
// import TrendingSection from "@/components/shop/home/trending-section";
// import CampaignBanner from "@/components/shop/home/campaign-banner";
import HomePageClient from "@/components/shop/home/home-page-client";

export default async function HomePage() {
  // ==========================
  // BEST SELLERS (DISABLED)
  // ==========================

  /*
  const bestSellerItems = await prisma.orderItem.groupBy({
    by: ["productId"],

    _sum: {
      quantity: true,
    },

    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },

    take: 8,
  });

  const bestSellerProducts = await prisma.product.findMany({
    where: {
      id: {
        in: bestSellerItems.map((item) => item.productId),
      },
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

  const bestSellers = bestSellerItems
    .map((item) => {
      const product = bestSellerProducts.find(
        (product) => product.id === item.productId,
      );

      if (!product) return null;

      return {
        ...product,
        sold: item._sum.quantity ?? 0,
      };
    })
    .filter(Boolean);
  */

  // ==========================
  // OTHER DATA
  // ==========================

  const [categories] = await Promise.all([
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),

    /*
    prisma.product.findMany({
      take: 4,

      include: {
        category: true,

        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.product.findMany({
      take: 8,

      include: {
        category: true,

        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.product.findMany({
      take: 8,

      include: {
        category: true,

        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    }),
    */
  ]);

  return (
    <main className="overflow-x-hidden bg-slate-950 text-white">
      {/* HERO */}
      <HomePageClient categories={categories} />

      {/* CATEGORIES */}
      {categories.length > 0 && <CategoriesShowcase categories={categories} />}

      {/* FEATURED COLLECTION */}
      {/*
      {featuredProducts.length > 0 && (
        <FeaturedCollection products={featuredProducts} />
      )}
      */}

      {/* NEW ARRIVALS */}
      {/*
      {newArrivals.length > 0 && (
        <NewArrivalsSection products={newArrivals} />
      )}
      */}

      {/* BEST SELLERS */}
      {/*
      {bestSellers.length > 0 && (
        <BestSellersSection products={bestSellers} />
      )}
      */}

      {/* TRENDING */}
      {/*
      {trendingProducts.length > 0 && (
        <TrendingSection products={trendingProducts} />
      )}
      */}

      {/* CAMPAIGN BANNER */}
      {/*
      <CampaignBanner />
      */}
    </main>
  );
}
