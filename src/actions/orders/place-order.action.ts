"use server";

import { auth } from "@/auth.config";
import { Size } from "@/interfaces/product.interface";
import { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No user in session",
    };
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds.map((p) => p.productId) },
      },
    });

    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

    const { subtotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(
          (product) => product.id === item.productId
        );

        if (!product) throw new Error(`${item.productId} doesnt exist - 500`);

        const subtotal = product.price * productQuantity;

        totals.subtotal += subtotal;
        totals.tax += subtotal * 0.15;
        totals.total += subtotal * 1.15;

        return totals;
      },
      { subtotal: 0, tax: 0, total: 0 }
    );

    // Transaction

    const prismaTx = await prisma.$transaction(async (tx) => {
      // update stock in products
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0)
          throw new Error(`${product.id} has no quantity`);

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // check negativa values in existence = no stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0)
          throw new Error(`${product.title} doesnt have enough stock`);
      });

      // create order - header /details
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subtotal: subtotal,
          tax: tax,
          total: total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // create order address
      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });
    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { ok: false, message: error.message };
  }
};
