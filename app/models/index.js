const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.product = require("./product.model");
// db.inventory = require("./inventory.model");
db.enterprise = require("./enterprise.model");
db.role = require("./role.model");



db.ROLES = ["user", "admin"];

module.exports = db;
