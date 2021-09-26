const express = require("express");
const {
  orderDetails,
  orderDetailsById,
} = require("../controller/orderController");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/", isAuth, orderDetails);
router.get("/:id", isAuth, orderDetailsById);

module.exports = router;
