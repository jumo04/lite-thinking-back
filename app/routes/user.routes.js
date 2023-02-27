const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const controllerEnterprise = require("../controllers/enterprise.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://54.237.60.164.nip.io"); 
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.put("/api/enterprise", [authJwt.verifyToken, authJwt.isAdmin], controllerEnterprise.findEnterprise);

  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);

};
