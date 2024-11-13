import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/categories/get-categories.action";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== "new") redirect("/admin/products");

  const title = slug === "new" ? "New Product" : "Edit Product";

  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
