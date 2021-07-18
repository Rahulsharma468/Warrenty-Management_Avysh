var mongoose = require("mongoose");
var helper = require("./helper");
const moment = require("moment-timezone");
const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");
var helperSchema = helper.schema;
const tempSchema = mongoose.Schema(
  {
    items: [helperSchema],
    purchaseDate: {
      type: Date,
      required: true,
      default: dateIndia,
    },
    user: {
      type: Object,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", tempSchema);
