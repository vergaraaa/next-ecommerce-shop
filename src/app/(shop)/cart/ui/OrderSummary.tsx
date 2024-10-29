"use client";

import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";

export const OrderSummary = () => {
  const { total, subtotal, tax, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <></>;

  return (
    <div className="grid grid-cols-2">
      <span>Products</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 item" : `${itemsInCart} items`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subtotal)}</span>

      <span>Taxes (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total</span>
      <span className="text-right text-2xl mt-5">{currencyFormat(total)}</span>
    </div>
  );
};
