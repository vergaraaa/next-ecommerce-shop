"use client";

import { useState } from "react";

import { Product, Size } from "@/interfaces/product.interface";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size>();
  const [quanity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
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
