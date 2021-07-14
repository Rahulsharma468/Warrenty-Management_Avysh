var mongoose = require("mongoose");

const helperSchema = mongoose.Schema(
  {
    prodName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    warrName: {
      type: String,
    },
    warrDuration: {
      year: {
        type: Number,
        default: 0,
      },
      month: {
        type: Number,
        default: 0,
      },
    },
    extended: {
      type: Boolean,
      required: true,
      default: false,
    },
    extendDur: {
      year: {
        type: Number,
        default: 0,
      },
      month: {
        type: Number,
        default: 0,
      },
    },
    extendPrice: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Helper", helperSchema);
