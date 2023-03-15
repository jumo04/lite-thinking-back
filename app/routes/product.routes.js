const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()

var jsonParser = bodyParser.json()
app.use(express.urlencoded({ extended: true }));


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/admin/product/create", [authJwt.verifyToken, authJwt.isAdmin], controller.createProduct);
  app.put("/admin/product/upgrade", [authJwt.verifyToken, authJwt.isAdmin], controller.upgrade);
  app.put("/admin/product/update", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  app.put("/admin/product/downgrade", [authJwt.verifyToken, authJwt.isAdmin], controller.downgrade);
  app.put("/admin/product/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
  app.get("/admin/product/products",[authJwt.verifyToken, authJwt.isAdmin], controller.getAll);
};
