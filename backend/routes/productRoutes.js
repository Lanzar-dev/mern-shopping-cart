const express = require("express");
const { isAdmin, isAuth } = require("../middleware/auth");

const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
} = require("../controller/productControllers");

//@desc GET all products from db
//@route GET /api/products
//@access Public
router.get("/", getAllProducts);

//@desc GET a product by id from db
//@route GET /api/product/:id
//@access Public
router.get("/:id", getProductById);
router.post("/", isAuth, createProduct);
router.put("/:id", isAuth, updateProductById);

module.exports = router;
