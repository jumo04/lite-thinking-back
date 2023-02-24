const express = require("express");
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;

const cors = require("cors");

const app = express();

const db = require("./app/models");
const Role = db.role;

const dbConfig = require("./app/config/db.config");

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Ensure you have run 'npm install mongodb'

var username = 'YOUR_USERNAME';
var password = 'YOUR_PASSWORD';
var hosts = 'iad2-c14-1.mongo.objectrocket.com:52441,iad2-c14-2.mongo.objectrocket.com:52441,iad2-c14-0.mongo.objectrocket.com:52441';
var database = 'lite_db';
var options = '?replicaSet=a110b1fdbb8c45a0abd6396479cbe897';
var connectionString = 'mongodb://' + username + ':' + password + '@' + hosts + '/' + database + options;

MongoClient.connect(connectionString, function(err, db) {
    if (db) {
        db.close();
    }
    if (err) {
        console.log('Error: ', err);
    } else {
        console.log('Connected!');
        process.exit();
    }
});

db.mongoose
  .connect(process.env.ORMONGO_URL || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

var corsOptions = {
  origin: "https://main.d2atobya8uav3e.amplifyapp.com/"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("se agrego user a los roles");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("se agrego admin a los roles");
      });
    }
  });
}

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/enterprise.routes')(app);
require('./app/routes/article.routes')(app);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


