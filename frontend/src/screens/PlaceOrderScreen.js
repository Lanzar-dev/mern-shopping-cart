import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import "../components/CartItem.css";
import "./PlaceOrderScreen.css";
import { createOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function PlaceOrderScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((price, item) => price + item.qty * item.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 10000 ? toPrice(1000) : toPrice(1500);
  cart.taxPrice = toPrice(0.1 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, history, success]);

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
                  <strong>Phone Number: +234</strong>
                  {cart.shippingAddress.phoneNumber} <br />
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
                  <div className="cartitem" key={item.product}>
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
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
