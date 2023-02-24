const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    ref: String,
    model: String,
    amount: String,
    value: String
  })
);

module.exports = Product;
