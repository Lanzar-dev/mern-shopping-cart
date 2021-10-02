import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import "./SigninScreen.css";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsUser } from "../redux/actions/userActions";

function ProfileScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>User Profile</h2>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={user.name}
                tabIndex={1}
              />
            </div>
            <div>
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={user.email}
                tabIndex={2}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                tabIndex={3}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
                tabIndex={4}
              />
            </div>
            <div>
              <label />
              <button className="btn btn-primary" type="submit" tabIndex={5}>
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProfileScreen;
