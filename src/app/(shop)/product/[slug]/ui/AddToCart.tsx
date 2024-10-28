"use client";

import { useState } from "react";

import { useCartStore } from "@/store/cart/cart-store";
import { CartProduct, Product, Size } from "@/interfaces/product.interface";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size>();
  const [quanity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quanity,
      size: size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">Must select a size</span>
      )}

      {/* SIZE SELECTOR */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* QUANTITY SELECTOR */}
      <QuantitySelector quantity={quanity} onQuantityChanged={setQuantity} />

      {/* ADD TO CART BUTTON */}
      <button onClick={addToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};
