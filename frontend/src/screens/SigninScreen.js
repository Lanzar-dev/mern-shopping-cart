import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../redux/actions/userActions";
import "./SigninScreen.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function SigninScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Sign In</h2>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>
        <div>
          <label htmlFor="password">
            Password:{" "}
            {/* <Link
              to="/forgotpassword"
              className="login-screen-forgotpassword"
              tabIndex={4}
            >
              Forgot Password?
            </Link> */}
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
          />
        </div>
        <div>
          <label />
          <button className="btn btn-primary" type="submit" tabIndex={3}>
            Sign In
          </button>
        </div>
        <div>
          <label />
          <span>
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
