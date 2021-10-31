//components
import Product from "../components/Product";

import "./HomeScreen.css";
import "../components/MessageBox.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Actions
import { getProducts as listProducts } from "../redux/actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const SearchScreen = () => {
  const { name = "all" } = useParams();
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts({ name: name !== "all" ? name : "" }));
  }, [dispatch, name]);

  return (
    <div className="homescreen">
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>

      <div className="homescreen__products">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}

            {products.map((product) => (
              <Product
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                description={product.description}
                imageUrl={product.imageUrl}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
