export const revalidate = 604800; // 7 days

import { notFound } from "next/navigation";

import { titleFont } from "@/config/fonts";
import { Slideshow } from "@/components/product/slideshow/Slideshow";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { MobileSlideshow } from "@/components/product/slideshow/MobileSlideshow";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* SLIDESHOW */}
      <div className="col-span-1 md:col-span-2">
        {/* MOBILE SLIDESHOW */}
        <MobileSlideshow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />

        {/* DESKTOP SLIDESHOW */}
        <div className="hidden md:block">
          <Slideshow
            images={product.images}
            title={product.title}
            className="hidden md:block"
          />
        </div>
      </div>

      {/* DETAILS */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5 font-semibold">${product.price}</p>

        {/* SIZE SELECTOR */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* QUANTITY SELECTOR */}
        <QuantitySelector quantity={3} />

        {/* ADD TO CART BUTTON */}
        <button className="btn-primary my-5">Add to cart</button>

        {/* DESCRIPTION */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
