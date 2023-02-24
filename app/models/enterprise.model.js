const mongoose = require("mongoose");

const Enterprise = mongoose.model(
  "Enterprise",
  new mongoose.Schema({
    nit: String,
    name: String,
    user: mongoose.Schema.Types.ObjectId,
    address: String,
    isDelete: {type: Boolean, default: false},
    phone: String
  })
);

module.exports = Enterprise;
