import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SigninScreen.css";

function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    //TODO: signin action
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Sign In</h2>
        </div>
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
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
