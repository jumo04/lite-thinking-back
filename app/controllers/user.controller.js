const db = require("../models");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// const aws = require("aws-sdk");
// const nodemailer = require("nodemailer");

const Enterprise = db.enterprise;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    
    const enter =  Enterprise.find({isDelete: false}, function (err, data) {
      // docs is an array of all docs in collection
      console.log(data);
      res.json(data);
    });
    
  };
  
  exports.adminBoard = (req, res) => {
    const enter =  Enterprise.find({isDelete: false}, function (err, data) {
      // docs is an array of all docs in collection
      
      res.json(data);
    });
    
  };

  // CODIGO BASE PARA EL HANDLER DEL EMAIL SITUADO EN AWS LAMNDA CORRIENDO 
  // https://cbggv12zcd.execute-api.us-east-1.amazonaws.com/sendemail
  // exports.handler = async (event) => {
  //   const {sendEmail, senderName, message, base64Data, date} = JSON.parse(event.body);

  //   const base64RemoveDataURI = base64Data.replace(
  //     "data:application/pdf;base64,",
  //     ""
  //   );

  //   let transporter = nodemailer.createTransport({
  //     SES: new aws.SES({region: "us-east-1", apiVersion: "2010-12-01"}),
  //   })


  //   let emailProps = await transporter.sendMail({
  //     from: senderName,
  //     to: sendEmail,
  //     subject: date,
  //     text: message,
  //     html: "<div>" + message + "</div>",
  //     attachments: [{
  //         filename: "TEST_FILE_NAME.pdf",
  //         content: base64RemoveDataURI,
  //         encoding: "base64"
  //     }]
  //   })

  //   return emailProps;
  // }