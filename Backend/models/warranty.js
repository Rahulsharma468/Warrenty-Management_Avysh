const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const array = [];
const warrSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    productIds: [{
        type: ObjectId,
        ref: "Product",
    }, ],
    resolution: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    extendable: {
        type: Boolean,
    },
    duration: {
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
    },
    extendDur: {
        year: {
            type: Number,
            required: true,
            default: 0,
        },
        month: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    extendPrice: {
        type: Number,
    },
}, { timestamps: true });

module.exports = mongoose.model("Warranty", warrSchema);