const mongoose = require("mongoose");
const orderschema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderId: {
        type: String,
        required: true,
        unique: true
    },

    items: [ 
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            name: String,
            price: Number,
            quantity: Number
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED"],
        default: "PENDING"
    }
});

const Order= mongoose.model("Order", orderschema);
module.exports = Order;