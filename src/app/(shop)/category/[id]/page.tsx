import { initialData } from "@/seed/seed";
import { Title } from "@/components/ui/title/Title";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Category } from "@/interfaces/product.interface";
// import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

export default async function CartPage({ params }: Props) {
  // if (id === "kids") return notFound();

  const { id } = await params;

  const products = initialData.products.filter(
    (product) => product.gender === id
  );

  const labels: Record<Category, string> = {
    men: "Men's",
    women: "Women's",
    kid: "Kids'",
    unisex: "Unisex",
  };

  return (
    <>
      <Title title={`${labels[id]} products`} />

      <ProductGrid products={products} />
    </>
  );
}
