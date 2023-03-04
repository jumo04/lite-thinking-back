const db = require("../models");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const Inventory = db.inventory;
const Product = db.product;

exports.createProduct = (req, res) => {
  if (req.body.ref) {
    Product.findOne({
      ref: req.body.ref
     }).exec((err, product) => {
       if (err) {
         res.status(500).send({ message: err });
         return;
       }
       console.log(product);
       if (product) {

        if (product.isDelete) {
          if(req.body.name){
            product.name= req.body.name;
          }
          if(req.body.ref){
            product.ref= req.body.ref;
          }
          if(req.body.amount){
            product.amount= req.body.amount;
          }
          if(req.body.value){
            product.value= req.body.value;
          }
    
          product.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "product was create successfully!" });
          });
         }else{
          res.send({ message: "product exits!" });
         }
        
       }else{
        // aca el producto no existe, lo creare
        const product = new Product({
          name: req.body.name,
          ref: req.body.ref,
          amount: req.body.amount,
          value: req.body.value
        });

        console.log(product);
        product.save((err, product) => {
            if (err) {
            res.status(500).send({ message: err });
            return;
            }
            res.send({ message: "Product was create successfully!" });
            return;
        });
       }
       });
  }

};


exports.upgrade = (req, res) => {
    Product.findOne({
        ref: req.body.ref
       }).exec((err, product) => {
         if (err) {
           res.status(500).send({ message: err });
           return;
         }
         if (!product) {
           return res.status(404).send({ message: "product Not found." });
         }

         product.amount =String(parseInt(product.amount) + 1);
         product.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "product exits, the amount its upgrades successfully!" });
            });
         });
}

exports.downgrade = (req, res) => {
  Product.findOne({
      ref: req.body.ref
     }).exec((err, product) => {
       if (err) {
         res.status(500).send({ message: err });
         return;
       }
 
       if (!product) {
         return res.status(404).send({ message: "Product Not found." });
       }

       product.amount =String(parseInt(product.amount) - 1);
       product.save(err => {
          if (err) {
              res.status(500).send({ message: err });
              return;
          }
          res.send({ message: "product exits, the amount its upgrades successfully!" });
          });
       });
}

exports.update = (req, res) => {
  Product.findOne({
     ref: req.body.ref
    }).exec((err, product) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!product) {
        return res.status(404).send({ message: "Product Not found." });
      }

      if(req.body.name){
        product.name= req.body.name;
      }
      if(req.body.ref){
        product.ref= req.body.ref;
      }
      if(req.body.amount){
        product.amount= req.body.amount;
      }
      if(req.body.value){
        product.value= req.body.value;
      }

      product.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "product was update successfully!" });

      });
    });
};


exports.delete = (req, res) => {
    Product.findOne({
      ref: req.body.ref
   }).exec((err, product) => {
       if (err) {
         res.status(500).send({ message: err });
         return;
       }

       console.log(product);
 
       if(product) {
         if(product.isDelete){
           return res.status(404).send({ message: "Product Not found or It was deleted before." });
         }
         product.isDelete = true;
         product.save(err => {
           if (err) {
                 res.status(500).send({ message: err });
                 return;
           }
           //ending change the isDetele variable to true 
           res.send({ message: "Product was delete successfully!" });
         });
       }else{
         return res.status(404).send({ message: "Product Not found or It was deleted before." });
       }
       
     });
};