"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  const session = await auth();

  if (!session?.user)
    return {
      ok: false,
      message: "Unauthorized",
    };

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderAddress: true,
        user: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error(`${orderId} does not exist`);

    if (session.user.role === "user") {
      if (session.user.id !== order.userId)
        throw new Error(`${orderId} doesn't belong to user`);
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Internal Server Error",
    };
  }
};
