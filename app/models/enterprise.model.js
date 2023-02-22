const mongoose = require("mongoose");

const Enterprise = mongoose.model(
  "Enterprise",
  new mongoose.Schema({
    nit: String,
    name: String,
    user: mongoose.Schema.Types.ObjectId,
    address: [
        {
            street: String,
            neibor: String,
            city: String
        }
    ],
    inventories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Inventory"
        }
      ],
    phone: String
  })
);

module.exports = Enterprise;
