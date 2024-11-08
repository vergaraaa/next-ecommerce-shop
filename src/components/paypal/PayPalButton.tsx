"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import { setTransactionId } from "@/actions/payments/set-transaction-id.action";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded"></div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          // invoice_id: '',
          amount: {
            value: `${roundedAmount}`,
            currency_code: "USD",
          },
        },
      ],
    });

    // set transaction id in db
    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) throw new Error("Failed to update the order");

    return transactionId;
  };

  return <PayPalButtons createOrder={createOrder} />;
};
