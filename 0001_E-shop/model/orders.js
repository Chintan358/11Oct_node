const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId
    },
    payid: {
        type: String
    },
    product: [
        {
            pid: {
                type: mongoose.Schema.Types.ObjectId
            },
            qty: {
                type: Number
            }
        }
    ]
})

module.exports = new mongoose.model("Order", orderSchema)