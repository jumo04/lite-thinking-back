const db = require("../models");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const Inventory = db.inventory;
const Article = db.article;

var jwt = require("jsonwebtoken");

exports.createInventory = (req, res) => {
  const inventory = new Inventory({
    name: req.body.name
  });
    if (req.body.ref) {
        Inventory.find(
        {
            name: { $in: req.body.name }
        },
        (err, inventory) => {
            if (err) {
                res.status(500).send({ message: err });
            return;

        }
            res.send({ message: "Inventory already exits!" });
        }
        );
    }
    if (req.body.articles) {
    Article.find(
        {
        ref: { $in: req.body.articles }
        },
        (err, articles) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        inventory.articles = articles.map(article => articles._id);
        inventory.save(err => {
            if (err) {
            res.status(500).send({ message: err });
            return;
            }

            res.send({ message: "Inventory was created successfully!" });
        });
        }
    );
    }else{
        inventory.save((err, article) => {
            if (err) {
             res.status(500).send({ message: err });
            return;
            }
            res.send({ message: "Inventory was create successfully!" });
        });
    
    }
        
    
    
};


exports.upgrade = (req, res) => {
    Article.findOne({
        ref: req.body.ref
       }).exec((err, article) => {
         if (err) {
           res.status(500).send({ message: err });
           return;
         }
   
         if (!article) {
           return res.status(404).send({ message: "Article Not found in the inventory." });
         }

         article.amount = article.amount + 1;
            article.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "Article exits, the amount its upgrades successfully!" });
            });
         });
}

exports.addArticle = (req, res) => {
    Inventory.findOne({
     name: req.body.name
    }).exec((err, article) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!article) {
        return res.status(404).send({ message: "Article Not found." });
      }

      if(req.body.name){
        article.name= req.body.name;
      }
      if(req.body.ref){
        article.ref= req.body.ref;
      }
      if(req.body.model){
        article.model= req.body.model;
      }
      if(req.body.amount){
        article.amount= req.body.amount;
      }
      if(req.body.value){
        article.value= req.body.value;
      }

      article.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Article was update successfully!" });

      });
    });
};

exports.upamount = (req, res) => {
    // aca la logica para aumentar la cantidad de cada articulo 
};
   
exports.pdf = (req, res) => {
 //la logica para descargar pdf
};

exports.delete = (req, res) => {
    Inventory.findOne({
     ref: req.body.ref
  }).exec((err, inventory) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!inventory) {
        return res.status(404).send({ message: "Inventory Not found." });
      }
      inventory.delete(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Inventory was delete successfully!" });

      });
    });
};