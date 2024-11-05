import Link from "next/link";

import { PlaceOrder } from "./ui/PlaceOrder";
import { Title } from "@/components/ui/title/Title";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
          {/* CART */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Manage items</span>

            <Link href="/cart" className="underline mb-5">
              Edit cart
            </Link>

            {/* ITEMS */}
            <ProductsInCart />
          </div>

          {/* CHECKOUT */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
