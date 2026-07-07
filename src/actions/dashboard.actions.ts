"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardAnalytics() {
  const [
    totalProducts,
    totalCategories,
    totalOrders,
    totalRevenue,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count(),

    prisma.category.count(),

    prisma.order.count(),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
    }),

    prisma.order.findMany({
      take: 5,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: true,
        shippingMethod: true,
      },
    }),
  ]);

  return {
    totalProducts,

    totalCategories,

    totalOrders,

    totalRevenue: totalRevenue._sum.total ?? 0,

    recentOrders,
  };
}
