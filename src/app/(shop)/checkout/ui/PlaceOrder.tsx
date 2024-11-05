"use client";

import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useAddressStore } from "@/store/address/address-store";

export const PlaceOrder = () => {
  const address = useAddressStore((state) => state.address);
  const { total, subtotal, tax, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <></>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>

      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.zipCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-0.5 rounded bg-gray-200  mb-10"></div>

      <h2 className="text-2xl mb-2">Order summary</h2>

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
        <span className="text-right text-2xl mt-5">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <button
          // href="/orders/123"
          className="flex btn-primary justify-center"
        >
          Place order
        </button>

        <p className="mb-5">
          <span className="text-xs">
            By clicking place order, you are accepting our{" "}
            <a href="#" className="underline">
              terms and conditions
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              privacy policy
            </a>
            .
          </span>
        </p>
      </div>
    </div>
  );
};
