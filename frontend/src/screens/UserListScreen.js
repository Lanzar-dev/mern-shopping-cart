import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { deleteUser, listUsers } from "../redux/actions/userActions";
import "./ProductListScreen.css";
import "./OrderHistoryScreen.css";
import {
  USER_DELETE_RESET,
  USER_DETAILS_RESET,
} from "../redux/constants/userConstants";

function UserListScreen({ history }) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div className="order_history">
      <h2>Users</h2>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}

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
                  <button
                    type="button"
                    className="small"
                    onClick={() => history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
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
