const express = require("express");
const { orderDetails } = require("../controller/orderController");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/", isAuth, orderDetails);

module.exports = router;
