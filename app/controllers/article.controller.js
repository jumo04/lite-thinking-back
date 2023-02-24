const db = require("../models");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const Inventory = db.inventory;
const Article = db.article;

var jwt = require("jsonwebtoken");

exports.createArticle = (req, res) => {
  const article = new Article({
    name: req.body.name,
    ref: req.body.ref,
    model: req.body.model,
    value: req.body.value
  });

    if (req.body.ref) {
        Article.find(
        {
            ref: { $in: req.body.ref }
        },
        (err, article) => {
            if (err) {
                res.status(500).send({ message: err });
            return;

        }
            res.send({ message: "Article already exits!" });
          }
        );
    }
        
    article.save((err, article) => {
        if (err) {
         res.status(500).send({ message: err });
        return;
        }
        res.send({ message: "Article was create successfully!" });
    });

    
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
           return res.status(404).send({ message: "Article Not found." });
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

exports.update = (req, res) => {
    Article.findOne({
     ref: req.body.ref
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


exports.delete = (req, res) => {
    Article.findOne({
     ref: req.body.ref
  }).exec((err, article) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!article) {
        return res.status(404).send({ message: "Article Not found." });
      }

      article.delete(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Article was delete successfully!" });

      });
    });
};