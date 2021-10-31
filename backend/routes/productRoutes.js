const express = require("express");
const { isAdmin, isAuth } = require("../middleware/auth");

const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProduct,
  createProductReviews,
} = require("../controller/productControllers");

router.get("/", getAllProducts);

router.get("/:id", getProductById);
router.post("/", isAuth, createProduct);
router.put("/:id", isAuth, updateProductById);
router.delete("/:id", isAuth, deleteProduct);
router.post("/:id/reviews", isAuth, createProductReviews);

module.exports = router;
