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

  app.post( "/admin/article/create", [authJwt.verifyToken, authJwt.isAdmin], controller.createArticle);
  app.post("/admin/article/upgrade", [authJwt.verifyToken, authJwt.isAdmin], controller.upgrade);
  app.post("/admin/article/update", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  app.post("/admin/article/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
};
