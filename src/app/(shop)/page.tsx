export const revalidate = 60;

import { redirect } from "next/navigation";

import { Title } from "@/components/ui/title/Title";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title="Shop" subtitle="All products" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
