const express = require('express');
const router = express.Router();

const {postOrder} = require('../controller/orderControllers');

//@desc POST all orders to db
//@route GET /api/orders
//@access Public
router.post('/', postOrder);

//@desc GET orders from db
//@route GET /api/orders/:id
// router.get('/:id', getOrders);

//@desc DELETE an order by id from db
//@route DELETE /api/orders/:id
// router.get('/:id', deleteOrderById);

module.exports = router;