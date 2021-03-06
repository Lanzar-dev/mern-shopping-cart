import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

// screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchScreen from "./screens/SearchScreen";

// components
import Navbar from "./components/Navbar";
import Backdrop from "./components/Backdrop";
import SideDrawer from "./components/SideDrawer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

//import Footer from "./components/Footer";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/product/:id/edit" component={ProductEditScreen} />
          <Route exact path="/signin" component={SigninScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/shipping" component={ShippingAddressScreen} />
          <Route exact path="/payment" component={PaymentMethodScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/order/:id" component={OrderScreen} />
          <Route exact path="/orderhistory" component={OrderHistoryScreen} />
          <Route exact path="/search/name/:name?" component={SearchScreen} />
          <PrivateRoute exact path="/profile" component={ProfileScreen} />
          <AdminRoute exact path="/productlist" component={ProductListScreen} />
          <AdminRoute exact path="/orderlist" component={OrderListScreen} />
          <AdminRoute exact path="/userlist" component={UserListScreen} />
          <AdminRoute exact path="/user/:id/edit" component={UserEditScreen} />
          <Route exact path="/cart" component={CartScreen} />
        </Switch>
      </main>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
