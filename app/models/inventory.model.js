const mongoose = require("mongoose");

const Inventory = mongoose.model(
  "Invenroy",
  new mongoose.Schema({
    name: String,
    articles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Article"
        }
      ]
  })
);

module.exports = Inventory;
