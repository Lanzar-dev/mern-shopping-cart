import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import "../components/CartItem.css";
import "./PlaceOrderScreen.css";

function PlaceOrderScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((price, item) => price + item.qty * item.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 10000 ? toPrice(1000) : toPrice(1500);
  cart.taxPrice = toPrice(0.1 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    //PlaceOrder Action
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h3>Shipping</h3>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.region}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h3>Payment</h3>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h3>Order Items</h3>
                {cart.cartItems.map((item) => (
                  <div className="cartitem">
                    <div className="cartitem__image">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>

                    <Link
                      to={`/product/${item.product}`}
                      className="cartitem__name"
                    >
                      <p>{item.name}</p>
                    </Link>

                    <p className="cartitem__price">
                      {item.qty} x &#8358;{item.price} = &#8358;
                      {item.qty * item.price}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h3>Order Summary</h3>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>&#8358;{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>&#8358;{cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>&#8358;{cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>&#8358;{cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems === 0}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
