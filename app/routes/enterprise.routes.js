const { verifyEnt, authJwt } = require("../middlewares");
const controller = require("../controllers/enterprise.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put("/api/delete", [authJwt.verifyToken, authJwt.isAdmin],  controller.del);
  app.post(
    "/api/auth/createnterprise", [authJwt.verifyToken],[verifyEnt.checkDuplicateNameOrNit,verifyEnt.checkUserExisted],
    controller.createnterprise
  );

  app.post("/api/auth/update", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  
};
