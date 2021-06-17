const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const array = [];
const warrSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productIds: [
      {
        type: ObjectId,
      },
    ],
    resolution: {
      type: String,
      requires: true,
    },
    type: {
      type: String,
      required: true,
    },
    extendable: {
      type: Boolean,
    },
    duration: {
      type: Number,
      required: true,
    },
    extendDur: {
      type: Number,
    },
    extendPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warranty", warrSchema);
