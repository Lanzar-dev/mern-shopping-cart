const express = require("express");
const {
  orderDetails,
  orderDetailsById,
  orderPaymentDetailsUpdate,
  getUserOrders,
} = require("../controller/orderController");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/user", isAuth, getUserOrders);
router.post("/", isAuth, orderDetails);
router.get("/:id", isAuth, orderDetailsById);
router.put("/:id/pay", isAuth, orderPaymentDetailsUpdate);

module.exports = router;
