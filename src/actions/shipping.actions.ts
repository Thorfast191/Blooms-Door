"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ======================
// CREATE
// ======================

export async function createShippingMethod(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const estimatedDays = formData.get("estimatedDays") as string;

  await prisma.shippingMethod.create({
    data: {
      name,
      price,
      estimatedDays,
    },
  });

  revalidatePath("/admin/shipping");
}

// ======================
// UPDATE
// ======================

export async function updateShippingMethod(formData: FormData) {
  const id = formData.get("id") as string;

  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const estimatedDays = formData.get("estimatedDays") as string;
  const isActive = formData.get("isActive") === "on";

  await prisma.shippingMethod.update({
    where: {
      id,
    },

    data: {
      name,
      price,
      estimatedDays,
      isActive,
    },
  });

  revalidatePath("/admin/shipping");
}

// ======================
// DELETE
// ======================
export async function deleteShippingMethod(id: string) {
  const orderCount = await prisma.order.count({
    where: {
      shippingMethodId: id,
    },
  });

  if (orderCount > 0) {
    throw new Error(
      "This shipping method is being used by existing orders and cannot be deleted.",
    );
  }

  await prisma.shippingMethod.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/shipping");
}

// ======================
// GET
// ======================
export async function getShippingMethods() {
  return prisma.shippingMethod.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getActiveShippingMethods() {
  return prisma.shippingMethod.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });
}
