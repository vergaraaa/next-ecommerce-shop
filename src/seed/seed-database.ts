import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
  // erase all rows
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // insert categories
  const { users, categories, products } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.country.createMany({
    data: countries,
  });

  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); // <string=shirt, string=uuid>

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()],
      },
    });

    // images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({ data: imagesData });
  });

  console.log("seed executed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
