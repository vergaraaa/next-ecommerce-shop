"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { Gender, Product } from "@prisma/client";

import { Size } from "@/interfaces/product.interface";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const parsedProduct = productSchema.safeParse(data);

  if (!parsedProduct.success) {
    console.log(parsedProduct.error.message);
    return { ok: false, message: parsedProduct.error.message };
  }

  const product = parsedProduct.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  await prisma.$transaction(async (tx) => {
    let product: Product;
    const tagsArray = rest.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    // update
    if (id) {
      product = await tx.product.update({
        where: { id: id },
        data: {
          ...rest,
          sizes: { set: rest.sizes as Size[] },
          tags: { set: tagsArray },
        },
      });
    } else {
      // create
      product = await tx.product.create({
        data: {
          ...rest,
          sizes: { set: rest.sizes as Size[] },
          tags: { set: tagsArray },
        },
      });
    }

    return { product };
  });

  return {
    ok: true,
  };
};
