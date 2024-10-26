export const revalidate = 60;

import { redirect } from "next/navigation";

import { Gender } from "@prisma/client";
import { Title } from "@/components/ui/title/Title";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

const labels: Record<string, string> = {
  men: "Men's",
  women: "Women's",
  kid: "Kids'",
  unisex: "Unisex",
};

export default async function CartPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) redirect(`/gender/${gender}`);

  return (
    <>
      <Title title={`${labels[gender]} products`} />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
