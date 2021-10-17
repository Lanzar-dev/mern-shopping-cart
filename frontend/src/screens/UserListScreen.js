import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listUsers } from "../redux/actions/userActions";
import "./ProductListScreen.css";
import "./OrderHistoryScreen.css";

function UserListScreen({ history }) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <div className="order_history">
      <h2>Users</h2>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>
                  <button type="button" className="small">
                    Edit
                  </button>
                  <button className="small">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserListScreen;
