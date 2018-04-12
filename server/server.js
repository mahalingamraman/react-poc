var express = require("express");
var path = require("path");
var app = express();
var path = require("path");
require("dotenv").config({
  silent: true
});

var env = process.env;

var port = process.env.PORT || 3005;
app.set("port", port);

app.use(express.static(path.join(__dirname, "../public")));

var server = app.listen(port, function() {
  console.log("Magic happens on port " + port);
});
