const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

let productSchema = new Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    warrantyId: {
        type: ObjectId,
        ref: "Warranty",
    },
    noWarranty: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);