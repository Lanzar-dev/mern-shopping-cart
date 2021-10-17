const express = require("express");
const {
  orderDetails,
  orderDetailsById,
  orderPaymentDetailsUpdate,
  getUserOrders,
  userOrders,
  orderDelete,
  orderDeliver,
} = require("../controller/orderController");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", isAuth, userOrders);
router.get("/user", isAuth, getUserOrders);
router.post("/", isAuth, orderDetails);
router.get("/:id", isAuth, orderDetailsById);
router.put("/:id/pay", isAuth, orderPaymentDetailsUpdate);
router.delete("/:id", isAuth, orderDelete);
router.put("/:id/deliver", isAuth, orderDeliver);

module.exports = router;
