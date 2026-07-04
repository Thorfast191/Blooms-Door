"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ========================
// CREATE CATEGORY
// ========================

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name?.trim()) {
    throw new Error("Category name is required");
  }

  const existing = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (existing) {
    throw new Error("Category already exists");
  }

  await prisma.category.create({
    data: {
      name,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
}

// ========================
// UPDATE CATEGORY
// ========================

export async function updateCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;

  if (!id || !name?.trim()) {
    throw new Error("Category name is required");
  }

  const existing = await prisma.category.findFirst({
    where: {
      name,
      NOT: {
        id,
      },
    },
  });

  if (existing) {
    throw new Error("Category already exists");
  }

  await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
}

// ========================
// DELETE CATEGORY
// ========================

export async function deleteCategory(id: string) {
  await prisma.product.updateMany({
    where: {
      categoryId: id,
    },
    data: {
      categoryId: null,
    },
  });

  await prisma.category.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
}

// ========================
// GET CATEGORIES
// ========================

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

// ========================
// GET CATEGORY BY ID
// ========================

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });
}
