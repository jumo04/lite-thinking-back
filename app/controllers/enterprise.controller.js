const config = require("../config/auth.config");
const db = require("../models");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const User = db.user;
const Enterprise = db.enterprise;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.creatEnterprise = (req, res) => {
  const enterprise = new Enterprise({
    nit: req.body.nit,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone
  });

  enterprise.save((err, enterprise) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.user) {
      User.find(
        {
          id: { $in: req.body.user }
        },
        (err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          enterprise.user = user;
          enterprise.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Enterprise was registered successfully!" });
          });
        }
      );
    } 
  });
};

exports.update = (req, res) => {
    Enterprise.findOne({
     nit: req.body.nit
  }).exec((err, enterprise) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!enterprise) {
        return res.status(404).send({ message: "Enterprise Not found." });
      }

      if(req.body.nit){
        enterprise.nit= req.body.nit;
      }
      if(req.body.name){
        enterprise.name= req.body.name;
      }
      if(req.body.address){
        enterprise.address= req.body.address;
      }
      if(req.body.phone){
        enterprise.phone= req.body.phone;
      }

      enterprise.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Enterprise was update successfully!" });

      });
    });
};


exports.delete = (req, res) => {
    Enterprise.findOne({
     nit: req.body.nit
  }).exec((err, enterprise) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!enterprise) {
        return res.status(404).send({ message: "Enterprise Not found." });
      }

      enterprise.delete(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Enterprise was delete successfully!" });

      });
    });
};