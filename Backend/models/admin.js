const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        reuqired: true,
    },
    password: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Admin", adminSchema);