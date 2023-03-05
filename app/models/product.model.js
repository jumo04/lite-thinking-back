const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    ref: String,
    qty: String,
    price: String,
    isDelete: {type: Boolean, default: false},
  })
);

module.exports = Product;
