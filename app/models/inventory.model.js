const mongoose = require("mongoose");

const Inventory = mongoose.model(
  "Invenroy",
  new mongoose.Schema({
    name: String,
    enterprise: mongoose.Schema.Types.ObjectId, 
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          amount: String
        }
      ]
  })
);

module.exports = Inventory;
