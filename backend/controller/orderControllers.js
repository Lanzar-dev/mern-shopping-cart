const Order = require('../models/Order');

const postOrder = async (req, res) => {
    if( !req.body.name || !req.body.email || !req.body.address || !req.body.phone || !req.body.total || !req.body.cartItems ) {
        return res.send({ message: "Data is required"});
    }
    const order = await Order(req.body).save();
    res.send(order);
}

module.exports = {
    postOrder,
}