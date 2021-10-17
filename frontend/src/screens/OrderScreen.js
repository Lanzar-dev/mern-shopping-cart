import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../components/CartItem.css";
import "./PlaceOrderScreen.css";
import "./OrderScreen.css";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  deliverOrder,
  detailsOrder,
  payOrder,
} from "../redux/actions/orderActions";

import FlutterwavePament from "../components/FlutterwavePayment";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../redux/constants/orderConstants";

function OrderScreen({ match }) {
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, orderId, order, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <h3>
            Order <span className="orderId">{order._id}</span>
          </h3>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h3>Shipping</h3>
                    <p>
                      <strong>Name:</strong> {order.shippingAddress.fullName}{" "}
                      <br />
                      <strong>Phone Number: +234</strong>
                      {order.shippingAddress.phoneNumber} <br />
                      <strong>Address:</strong> {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.region}
                    </p>
                    {order.isDelivered ? (
                      <MessageBox variant="success">
                        Delivered at {order.deliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Delivered</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h3>Payment</h3>
                    <p>
                      <strong>Method:</strong> {order.paymentMethod}
                    </p>
                    {order.isPaid &&
                    order.paymentResult.status === "successful" ? (
                      <MessageBox variant="success">
                        Paid at {order.paidAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Paid</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h3>Order Items</h3>
                    {order.orderItems.map((item) => (
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
                      <div>&#8358;{order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>&#8358;{order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>&#8358;{order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong>Order Total</strong>
                      </div>
                      <div>
                        <strong>&#8358;{order.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                  {!order.isPaid && (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <FlutterwavePament onSuccess={successPaymentHandler} />
                    </>
                  )}
                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <li>
                      {loadingDeliver && <LoadingBox></LoadingBox>}
                      {errorDeliver && (
                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                      )}
                      <button
                        type="button"
                        className="primary block"
                        onClick={deliverHandler}
                      >
                        Deliver Order
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderScreen;
