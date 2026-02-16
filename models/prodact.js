const mongoose = require("mongoose")
const prodactSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,

    },
    salrey: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0,

    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Prodact", prodactSchema)
module.exports = Product;
