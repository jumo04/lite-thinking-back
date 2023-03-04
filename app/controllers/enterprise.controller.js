const db = require("../models");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const User = db.user;
const Enterprise = db.enterprise;

var jwt = require("jsonwebtoken");


exports.createnterprise = (req, res) => {
   if (req.body.nit) {
    Enterprise.findOne({
      nit: req.body.nit
    }).exec((err, enterprise) => {
       if (err) {
         res.status(500).send({ message: err });
         return;
       }
       console.log(enterprise);
       if (enterprise) {

        if (enterprise.isDelete) {
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
     
          enterprise.isDelete = false;
     
          enterprise.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "Enterprise was created successfully!" });
     
          });
         }else{
          res.send({ message: "Enterprise exits!" });
         }
        
       }else{
        // aca la empresa no existe, lo creare
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
                username: { $in: req.body.user.username }
              },
              (err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                enterprise.user = user._id;
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
       }
       });
  }
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

exports.findEnterprise = (req, res) => {
  Enterprise.findOne({
   nit: req.body.nit
}).exec((err, enterprise) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(enterprise) {
      if(enterprise.isDelete){
        return res.status(404).send({ message: "Enterprise Not found." });
      }
      console.log(enterprise);
      res.json(enterprise);
    }else{
      return res.status(404).send({ message: "Enterprise Not found." });
    }
  });
};

exports.del = (req, res) => {
    Enterprise.findOne({
     nit: req.body.nit
  }).exec((err, enterprise) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      console.log(enterprise);

      if(enterprise) {
        if(enterprise.isDelete){
          return res.status(404).send({ message: "Enterprise Not found or It was deleted before." });
        }
        enterprise.isDelete = true;
        enterprise.save(err => {
          if (err) {
                res.status(500).send({ message: err });
                return;
          }
          //endig change the isDetele variable to true 
          res.send({ message: "Enterprise was delete successfully!" });
        });
      }else{
        return res.status(404).send({ message: "Enterprise Not found or It was deleted before." });
      }
      
    });
};