import * as actionTypes from "../constants/productConstants";

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//state = {loading: true}
export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, succes: true, product: action.payload };
    case actionTypes.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case actionTypes.PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
