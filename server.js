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

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
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

// var corsOptions = {
//   origin: ["http://localhost:8081", "https://main.d2d5zxiqav1vu1.amplifyapp.com/"]
// };


var allowedOrigins = ['http://localhost:8081',
                      'https://main.d2d5zxiqav1vu1.amplifyapp.com'];


app.use(cors());

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


