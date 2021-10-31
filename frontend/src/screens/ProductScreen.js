import "./ProductScreen.css";
import "../components/MessageBox.css";
import Fade from "react-reveal/Fade";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import {
  createReview,
  getProductDetails,
} from "../redux/actions/productActions";
import { addTocart } from "../redux/actions/cartActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_REVIEW_CREATE_RESET } from "../redux/constants/productConstants";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }

    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, product, match, successReviewCreate]);

  const addToCartHandler = () => {
    dispatch(addTocart(product._id, qty));
    history.push("/cart");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(createReview(match.params.id, { comment, name: userInfo.name }));
    } else {
      alert("Please enter comment");
    }
  };

  return (
    <div>
      <div className="productscreen">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="productscreen__left">
              <Fade left>
                <div className="left__image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>

                <div className="left__info">
                  <p className="left__name">{product.name}</p>
                  <p>Price: &#8358; {product.price}</p>
                  <p>Description: {product.description}</p>
                </div>
              </Fade>
            </div>

            <div className="productscreen__right">
              <Fade right>
                <div className="right__info">
                  <p>
                    Price: <span>&#8358; {product.price}</span>
                  </p>
                  <p>
                    Status:{" "}
                    <span>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </p>
                  <p>
                    Qty
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <button type="button" onClick={addToCartHandler}>
                      Add To Cart
                    </button>
                  </p>
                </div>
              </Fade>
            </div>
          </>
        )}
      </div>
      <div>
        <h3 id="reviews">Reviews</h3>
        {/* {product.reviews && product.reviews[0] ? (
          <div>
            {product.reviews &&
              product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <p>{review.createAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
          </div>
        ) : (
          <MessageBox>There is no review yet</MessageBox>
        )} */}
        {/* {product.reviews.length === 0 && (
          <MessageBox>There is no review yet</MessageBox>
        )}

        {product.reviews.map((review) => (
          <li key={review._id}>
            <strong>{review.name}</strong>
            <p>{review.createAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
          </li>
        ))} */}
        <ul>
          <li>
            {userInfo ? (
              <form className="form" onSubmit={submitHandler}>
                <div>
                  <h3>Write a customer review</h3>
                </div>
                <div>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    id="comment"
                    cols="1"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
                <div>
                  {loadingReviewCreate && <LoadingBox></LoadingBox>}
                  {errorReviewCreate && (
                    <MessageBox variant="danger">
                      {errorReviewCreate}
                    </MessageBox>
                  )}
                </div>
              </form>
            ) : (
              <MessageBox>
                Please <Link to="/signin">Sign In</Link> to write a review
              </MessageBox>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductScreen;
