import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails as detailsProduct,
  updateProduct,
} from "../redux/actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../redux/constants/productConstants";
import axios from "axios";

function ProductEditScreen({ match, history }) {
  const id = match.params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const getProductDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = getProductDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      history.push("/productlist");
    }
    if (!product || product._id !== id || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
      setCountInStock(product.countInStock);
    }
  }, [dispatch, id, product, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        imageUrl,
        countInStock,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("imageUrl", file);
    // console.log("Images are", bodyFormData.getAll("imageUrl"));
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImageUrl(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Edit Product - {id}</h2>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
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
                value={name}
                tabIndex={1}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                placeholder="Enter price"
                value={price}
                tabIndex={2}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="text"
                id="image"
                placeholder="Enter image"
                value={imageUrl}
                tabIndex={3}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="imageFile">Image File:</label>
              <input
                type="file"
                id="imageFile"
                // value={imageUrl}
                label="Choose Image"
                tabIndex={4}
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock:</label>
              <input
                type="text"
                id="countInStock"
                placeholder="Enter countInStock"
                value={countInStock}
                tabIndex={5}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                type="text"
                id="description"
                rows="4"
                placeholder="Enter description"
                value={description}
                tabIndex={6}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button type="submit" className="btn btn-primary" tabIndex={7}>
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProductEditScreen;
