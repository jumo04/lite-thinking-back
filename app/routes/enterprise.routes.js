const { verifyEnt } = require("../middlewares");
const controller = require("../controllers/enterprise.controller");

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

  app.post(
    "/api/auth/createnterprise", [authJwt.verifyToken],[verifyEnt.checkDuplicateNameOrNit,verifyEnt.checkUserExisted],
    controller.createnterprise
  );

  app.post("/api/auth/update", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  app.post("/api/auth/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
};
