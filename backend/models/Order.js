const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(10)
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        match: /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g,
        required: true
    },
    total: {
        type: Number,
    },
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        countInStock: Number
    }],
}, {
    timestamps: true
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;