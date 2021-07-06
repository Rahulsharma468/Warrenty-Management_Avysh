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
      required: true,
    },
    warrDuration: {
      year: {
        type: Number,
        required: true,
      },
      month: {
        type: Number,
        required: true,
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
      default: 0,
    },
    _id: false,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Helper", helperSchema);
