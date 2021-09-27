import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useSelector } from "react-redux";

export default function App() {
  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    order: { shippingAddress, totalPrice },
  } = orderDetails;

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {};

  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userInfo.email,
      phonenumber: shippingAddress.phoneNumber,
      name: shippingAddress.fullName,
    },
    customizations: {
      title: "Moje Store",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Pay Now
      </button>
    </div>
  );
}
