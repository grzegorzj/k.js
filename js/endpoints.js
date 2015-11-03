var underscore = require("underscore");
var $ = require("jquery");

var validators = require("./validators.js");
var transforms = require("./transforms.js");
var Endpoint = require("./endpoint.js");

var Client = function (APIURL, endpointsList) {
  /*Instantiate endpoints*/
  var that = this;
  this.endpoints = {};

  var endpoints = JSON.parse(endpointsList);
  _.each(endpoints, function(endpoint) {
    /*Instantiate Endpoint object*/
    that.endpoints[endpoint.alias] = new Endpoint(endpoint);
    /*Create alias*/
    if(!that.hasOwnProperty(endpoint.alias)) {
      that[endpoint.alias] = (function(that) {
        return function () {
          return that.endpoints[endpoint.alias].go(arguments);
        };
      })(that);
    }
  });
};

module.exports = Client;
