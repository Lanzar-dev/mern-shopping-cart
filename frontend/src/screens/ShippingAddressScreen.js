import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/actions/cartActions";
import "./ShippingAddressScreen.css";
import "./SigninScreen.css";

function ShippingAddressScreen({ history }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    history.push("/signin");
  }

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [address, setAddress] = useState(shippingAddress.address);
  const [region, setRegion] = useState(shippingAddress.region);
  const [city, setCity] = useState(shippingAddress.city);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, phoneNumber, address, region, city })
    );

    history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Shipping Address</h2>
        </div>

        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            tabIndex={1}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <span className="phoneNumber">
            <p>+234</p>{" "}
            <input
              type="text"
              id="phoneNumber"
              placeholder="70 30XX XXX "
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              tabIndex={2}
            />
          </span>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            tabIndex={3}
          />
        </div>
        <div>
          <label htmlFor="region">State/Region</label>
          <input
            type="text"
            id="region"
            placeholder="Enter state or region"
            required
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            tabIndex={4}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            tabIndex={5}
          />
        </div>
        <div>
          <label />
          <button className="btn btn-primary" type="submit" tabIndex={6}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressScreen;
