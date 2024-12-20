"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useCartStore } from "@/store/cart/cart-store";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <></>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{ height: 100, width: 100 }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link href={`/product/${product.slug}`} className="hover:underline">
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>

            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => {
                updateProductQuantity(product, quantity);
              }}
            />

            <button
              onClick={() => removeProduct(product)}
              className="underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
