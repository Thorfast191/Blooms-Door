"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

// ========================
// CREATE ORDER
// ========================

interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;

  address: string;

  shippingMethodId?: string;

  items: {
    productId: string;
    quantity: number;
  }[];
}

export async function createOrder({
  customerName,
  customerPhone,
  customerEmail,
  address,
  shippingMethodId,
  items,
}: CreateOrderInput) {
  if (!items.length) {
    throw new Error("Cart is empty");
  }

  const shippingMethod = shippingMethodId
    ? await prisma.shippingMethod.findUnique({
        where: {
          id: shippingMethodId,
        },
      })
    : null;

  let subtotal = 0;

  const orderItems: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[] = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: {
        id: item.productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    subtotal += product.price * item.quantity;

    orderItems.push({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const shipping = shippingMethod?.price ?? 0;
  const total = subtotal + shipping;

  const order = await prisma.order.create({
    data: {
      customerName,
      customerPhone,
      customerEmail,
      address,

      shippingMethodId,

      subtotal,
      shipping,
      total,

      items: {
        create: orderItems,
      },
    },

    include: {
      shippingMethod: true,

      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/shop");

  return order;
}
// ========================
// GET ORDERS
// ========================

export async function getOrders(page = 1, search = "") {
  const take = 10;
  const skip = (page - 1) * take;

  return prisma.order.findMany({
    where: {
      ...(search && {
        OR: [
          {
            id: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            customerName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            customerPhone: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            customerEmail: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },

    take,
    skip,

    include: {
      shippingMethod: true,

      items: {
        include: {
          product: {
            include: {
              images: true,
              category: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

// ========================
// UPDATE ORDER STATUS
// ========================

export async function updateOrderStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as OrderStatus;

  if (!id || !status) {
    throw new Error("Missing order id or status.");
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin/orders");
}
