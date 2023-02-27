const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

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
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
