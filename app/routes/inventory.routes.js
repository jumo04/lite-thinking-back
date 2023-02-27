const { authJwt } = require("../middlewares");
const controller = require("../controllers/article.controller");

var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()

var jsonParser = bodyParser.json()
app.use(express.urlencoded({ extended: true }));


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://main.d2d5zxiqav1vu1.amplifyapp.com"); 
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/admin/inventory/create", [authJwt.verifyToken, authJwt.isAdmin], controller.createInventory);
  app.post("/admin/inventory/addArticle", [authJwt.verifyToken, authJwt.isAdmin], controller.addArticle);
  app.post("/admin/inventory/up", [authJwt.verifyToken, authJwt.isAdmin], controller.upAmount);
  app.post("/admin/inventory/show", [authJwt.verifyToken, authJwt.isAdmin], controller.show);
  app.post("/admin/inventory/pdf", [authJwt.verifyToken, authJwt.isAdmin], controller.pdf);
};
