"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin")
    return {
      ok: false,
      message: "Unauthorized",
    };

  try {
    const newRole = role === "admin" ? "admin" : "user";

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/users");

    return { ok: true };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error updating role",
    };
  }
};
