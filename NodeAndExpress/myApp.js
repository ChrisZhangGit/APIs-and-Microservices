var express = require("express");
var bodyParser = require("body-parser");
var app = express();

console.log("Hello World");

//app.get("/", (req,res) => {res.send("Hello Express")});

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.use("/public", express.static(__dirname + "/public"));

//process.env.MESSAGE_STYLE == "uppercase" && app.get('/json',(req,res) => res.json({'message': 'Hello json'}))

//var response = "Hello World".toUpperCase();
//process.env.VAR_NAME == 'allCaps' ? response = "Hello World".toUpperCase() : response = "Hello World"
app.get("/json", (req, res) => {
  let resultMessage = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase") {
    resultMessage = resultMessage.toUpperCase();
  }

  res.json({ message: resultMessage });
});

//Implement a Root-Level Request Logger Middleware
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//Chain Middleware to Create a Time Server
app.get(
  "/now",
  function(req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function(req, res) {
    res.send({ time: req.time });
  }
);

//Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});

//Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
  var { first: firstName, last: lastName } = req.query;
  res.json({ name: `${firstName} ${lastName}` });
});

//Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));

//Get Data from POST Requests
app.post("/name", function(req, res) {
  var { first: firstName, last: lastName } = req.body;
  var urlString = firstName + " " + lastName;
  res.json({ name: urlString });
});

module.exports = app;


































 module.exports = app;
