import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails as detailsProduct } from "../redux/actions/productActions";

function ProductEditScreen({ match }) {
  const id = match.params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const getProductDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = getProductDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(detailsProduct(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
      setCountInStock(product.countInStock);
    }
  }, [dispatch, id, product]);

  return <div>Edit Product</div>;
}

export default ProductEditScreen;
