const mongoose = require("mongoose");

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    name: String,
    ref: String,
    model: String,
    amount: String,
    value: String
  })
);

module.exports = Article;
