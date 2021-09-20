import CartItem from "../components/CartItem";
import "./CartScreen.css";
import Fade from "react-reveal/Fade";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";

// Actions
import { addTocart, removeFromCart } from "../redux/actions/cartActions";
// import { useState } from "react";

const CartScreen = ({ history }) => {
  // const [showCheckout, setShowCheckout] = useState(false);
  // const [person, setPerson] = useState({ fullName: '', email: '', address: '', phone: '' });

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addTocart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  const checkoutHandler = () => {
    history.push("/signin?redirect=shipping");
  };

  // const handleChange = (e) => {
  //     // const name = e.target.name;
  //     // const value = e.target.value;
  //     setPerson({...person, [e.target.name]: e.target.value});
  // }

  // const createOrder = (e) => {
  //     e.prevenDefault();
  //     const order = {
  //         name: person.fullName,
  //         email: person.email,
  //         address: person.address,
  //         phone: person.phone,
  //         cartItems
  //     }
  //     createOrder(order);
  // }

  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <Fade left>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <MessageBox>
              Your cart is empty. <Link to="/">Go Back</Link>
            </MessageBox>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeHandler}
              />
            ))
          )}
        </Fade>
      </div>
      <div className="cartscreen__right">
        <Fade top>
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>
              <strong>&#8358; {getCartSubTotal().toFixed(2)}</strong>
            </p>
          </div>
          <div>
            <button onClick={checkoutHandler} disabled={cartItems.length === 0}>
              Proceed To Checkout
            </button>
          </div>
        </Fade>
        {/* Checkout form */}
        {/* {showCheckout && (
                     <article className='form'>
                         <Fade right>
                        <form onSubmit={createOrder}>
                            <div className='form-control'>
                                <label htmlFor='fullName'>Name : </label>
                                <input
                                type='text'
                                id='fullName'
                                required
                                name='fullName'
                                value={person.fullName}
                                onChange={handleChange}
                                />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='email'>Email : </label>
                                <input
                                type='email'
                                id='email'
                                required
                                name='email'
                                value={person.email}
                                onChange={handleChange}
                                />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='phone'>Phone : </label>
                                <input
                                type='text'
                                id='phone'
                                required
                                name='phone'
                                value={person.phone}
                                onChange={handleChange}
                                />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='address'>Address : </label>
                                <input
                                type='text'
                                id='address'
                                required
                                name='address'
                                value={person.address}
                                onChange={handleChange}
                                />
                            </div>
                            <button type='submit' className='btn'>
                               Checkout
                            </button>
                        </form>
                        </Fade>
                    </article>
                )} */}
      </div>
    </div>
  );
};

export default CartScreen;
