import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{ height: 100, width: 100 }}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>

            <div className="mb-10">
              <p className="text-xl">Edgar Vergara</p>
              <p>Main Street 123</p>
              <p>City Center</p>
              <p>Town</p>
              <p>City</p>
              <p>Zip Code 12312</p>
              <p>123.123.123</p>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-0.5 rounded bg-gray-200  mb-10"></div>

            <h2 className="text-2xl mb-2">Order summary</h2>

            <div className="grid grid-cols-2">
              <span>Products</span>
              <span className="text-right">3 items</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Taxes (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-right text-2xl mt-5">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                href="/orders/123"
                className="flex btn-primary justify-center"
              >
                Place order
              </Link>

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
        </div>
      </div>
    </div>
  );
}
