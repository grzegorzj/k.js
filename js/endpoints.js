var validators = require("./validators.js");
var transforms = require("./transforms.js");
var endpoint = require("./endpoint.js");

var fs = require("fs");
var endpointsList = fs.readFileSync(__dirname + "/endpoints.example.json",
 "utf8");

var Endpoints = function (APIURL, Endpoints) {
  /*Instantiate endpoints*/
  var that = this;

  var endpoints = JSON.parse(endpointsList);
  _.each(endpoints, function(endpoint) {
    if(!that.hasOwnProperty(endpoint.alias)) {
      that[endpoint.alias] = new Endpoint(endpoint);
    }
  });
};

module.exports = Endpoints;
