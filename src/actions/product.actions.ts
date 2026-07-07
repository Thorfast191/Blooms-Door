"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const categoryId = (formData.get("categoryId") as string) || null;

  const images = formData.getAll("images") as string[];

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      categoryId,

      images: {
        create: images.map((url, index) => ({
          imageUrl: url,
          sortOrder: index,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const categoryId = (formData.get("categoryId") as string) || null;

  const images = formData.getAll("images") as string[];

  await prisma.product.update({
    where: {
      id,
    },

    data: {
      name,
      description,
      price,
      stock,
      categoryId,

      images: {
        deleteMany: {},

        create: images.map((url, index) => ({
          imageUrl: url,
          sortOrder: index,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

// ========================
// DELETE PRODUCT
// ========================
export async function deleteProduct(id: string) {
  const orderCount = await prisma.orderItem.count({
    where: {
      productId: id,
    },
  });

  if (orderCount > 0) {
    throw new Error("This product exists in orders and cannot be deleted.");
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}
// ========================
// ADMIN PRODUCTS
// ========================

export async function getAdminProducts(page = 1, search = "") {
  const take = 10;
  const skip = (page - 1) * take;

  return prisma.product.findMany({
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },

    take,
    skip,

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
  });
}

export async function getPublicProducts() {
  return prisma.product.findMany({
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
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
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
}
