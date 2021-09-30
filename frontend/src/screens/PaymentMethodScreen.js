import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../redux/actions/cartActions";
import "./PaymentMethodScreen.css";
import "./SigninScreen.css";

function PaymentMethodScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Flutterwave");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Payment Method</h2>
        </div>
        <div className="payment_method">
          <input
            type="radio"
            id="flutterwave"
            value="Flutterwave"
            name="paymentMethod"
            required
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="flutterwave">Flutterwave</label>
        </div>
        <div className="payment_method">
          <input
            type="radio"
            id="cashOnDelivery"
            value="cashOnDelivery"
            name="paymentMethod"
            disabled={true}
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="cashOnDelivery">
            Cash On Delivery (Not available for now)
          </label>
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Proceed to summary
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodScreen;
