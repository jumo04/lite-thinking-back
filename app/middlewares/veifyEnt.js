const db = require("../models");
const USER = db.user;
const Enterprise = db.enterprise;

checkDuplicateNameOrNit = (req, res, next) => {
  // name
    Enterprise.findOne({
        name: req.body.name
  }).exec((err, enterprise) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (enterprise) {
      res.status(400).send({ message: "Failed! name is already in use!" });
      return;
    }

    // NIT
    Enterprise.findOne({
      nit: req.body.nit
    }).exec((err, enterprise) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (enterprise) {
        res.status(400).send({ message: "Failed! NIT is already in use!" });
        return;
      }

      next();
    });
  });
};

checkUserExisted = (req, res, next) => {
  if (req.body.userid) {
      if (!USER.includes(req.body.userid)) {
        res.status(400).send({
          message: `Failed! User ${req.body.userid} does not exist!`
        });
        return;
      }
    
  }

  next();
};

const verifyEnt = {
    checkDuplicateNameOrNit,
    checkUserExisted
};

module.exports = verifyEnt;
