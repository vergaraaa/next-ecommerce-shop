import Image from "next/image";
import { redirect } from "next/navigation";

import { Title } from "@/components/ui/title/Title";
import { currencyFormat } from "@/utils/currencyFormat";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { PayPalButton } from "@/components/paypal/PayPalButton";
import { getOrderById } from "@/actions/orders/get-order-by-id.action";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  const { ok, order } = await getOrderById(id);

  if (!ok || !order) redirect("/");

  const address = order.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
          {/* CART */}
          <div className="flex flex-col mt-5">
            <div className="mb-5">
              <OrderStatus isPaid={order.isPaid} />
            </div>

            {/* ITEMS */}
            {order.OrderItem.map((item) => (
              <div
                key={`${item.product.slug} - ${item.size}`}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{ height: 100, width: 100 }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    {currencyFormat(item.price)} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>

            <div className="mb-10">
              <p className="text-xl">
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.zipCode}</p>
              <p>
                {address?.city}, {address?.countryId}
              </p>
              <p>{address?.phone}</p>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-0.5 rounded bg-gray-200  mb-10"></div>

            <h2 className="text-2xl mb-2">Order summary</h2>

            <div className="grid grid-cols-2">
              <span>Products</span>
              <span className="text-right">
                {order.itemsInOrder === 1
                  ? "1 item"
                  : `${order.itemsInOrder} items`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order.subtotal)}
              </span>

              <span>Taxes (15%)</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-right text-2xl mt-5">
                {currencyFormat(order.total)}
              </span>
            </div>

            {/* PAYPAL BUTTON */}
            <div className="mt-5">
              {order.isPaid ? (
                <OrderStatus isPaid={order.isPaid} />
              ) : (
                <PayPalButton orderId={order.id} amount={order.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
