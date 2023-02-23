const db = require("../models");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



const Enterprise = db.enterprise;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    
    const enter =  Enterprise.find({}, function (err, data) {
      // docs is an array of all docs in collection
      console.log(data);
      res.json(data);
    });
    
  };
  
  exports.adminBoard = (req, res) => {
    const enter =  Enterprise.find({}, function (err, data) {
      // docs is an array of all docs in collection
      
      res.json(data);
    });
    
  };
