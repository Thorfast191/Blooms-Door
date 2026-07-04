"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await prisma.admin.update({
    where: {
      email: session.user.email,
    },
    data: {
      name,
      email,
    },
  });

  revalidatePath("/admin/settings");
}

export async function changePassword(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  const admin = await prisma.admin.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  const valid = await bcrypt.compare(currentPassword, admin.password);

  if (!valid) {
    throw new Error("Current password is incorrect.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.admin.update({
    where: {
      id: admin.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  revalidatePath("/admin/settings");
}
