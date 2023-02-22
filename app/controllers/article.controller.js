const db = require("../models");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const User = db.user;
const Article = db.article;

var jwt = require("jsonwebtoken");

exports.createArticle = (req, res) => {
  const article = new Article({
    name: req.body.name,
    ref: req.body.ref,
    model: req.body.model,
    amount: req.body.amount,
    value: req.body.velue
  });

    if (req.body.name) {
        Article.find(
        {
            name: { $in: req.body.name }
        },
        (err, article) => {
            if (err) {
                res.status(500).send({ message: err });
            return;

        }
            article.amount = article.amount + 1;
            article.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "Article exits, its update de amount!" });
            });
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
        name: req.body.name
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
     name: req.body.name
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