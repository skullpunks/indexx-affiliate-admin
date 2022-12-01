import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import { PayPalButtonsComponentProps } from "@paypal/paypal-js/types/components/buttons";
import React from "react";
import { OrderApplicationContext } from "@paypal/paypal-js/types/apis/orders";

const paypalScriptOptions: PayPalScriptOptions = {
  "client-id":
    "AXa3gH4z0CNhuFuh3jXvTVrgd5Btn1wPHBOjW1W-JpNGik2on3KE-GczXd5PT8gAMGXSZ-SYL2Evrt8q",
  currency: "USD"
};
function Button() {
  /**
   * usePayPalScriptReducer use within PayPalScriptProvider
   * isPending: not finished loading(default state)
   * isResolved: successfully loaded
   * isRejected: failed to load
   */
  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "0.01"
            }
          }
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
          brand_name: "Indexx.ai",
          locale: "en-US",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          //payment_method: UnknownObject,
          return_url: "https://cex.indexx.ai",
          cancel_url: "https://cex.indexx.ai",
          //stored_payment_source: UnknownObject,
        } as OrderApplicationContext,
      });
    },
    onApprove(data, actions) {
      /**
       * data: {
       *   orderID: string;
       *   payerID: string;
       *   paymentID: string | null;
       *   billingToken: string | null;
       *   facilitatorAccesstoken: string;
       * }
       */
      return actions.order.capture({}).then((details) => {
        alert(
          "Transaction completed by"
        );

        alert("Data details: " + JSON.stringify(data, null, 2));
      });
    }
  };
  return (
    <>
      {isPending ? <h2>Load Smart Payment Button...</h2> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
}

export default function App() {
  return (
    <div className="container">
      <div className="child">
        <PayPalScriptProvider options={paypalScriptOptions}>
          <Button />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
