import "./ProductScreen.css";
import "../components/MessageBox.css";
import Fade from "react-reveal/Fade";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addTocart } from "../redux/actions/cartActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, product, match]);

  const addToCartHandler = () => {
    dispatch(addTocart(product._id, qty));
    history.push("/cart");
  };

  return (
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
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
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
  );
};

export default ProductScreen;
