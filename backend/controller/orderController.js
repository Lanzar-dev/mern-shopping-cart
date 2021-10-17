const { reset } = require("nodemon");
const Order = require("../models/Order");

const orderDetails = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  try {
    if (orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: req.user._id,
      });

      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  } catch (error) {
    next(error);
  }
};

const orderDetailsById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

const orderPaymentDetailsUpdate = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.transaction_id,
      status: req.body.status,
      update_time: req.body.tx_ref,
      email_address: req.body.customer.email,
    };

    const updatedOrder = await order.save();
    res.send({ message: "Order Paid", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
};

const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
};

const userOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "name");

  res.send(orders);
};

const orderDelete = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    const deletedOrder = await order.remove();

    res.send({ message: "Order Deleted", order: deletedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
};

module.exports = {
  orderDetails,
  orderDetailsById,
  orderPaymentDetailsUpdate,
  getUserOrders,
  userOrders,
  orderDelete,
};
