var fs = require("fs");
var endpointsList = fs.readFileSync(__dirname + "/endpoints.js", "utf8");

global._ = require("underscore");
global.$ = require("jquery");

var Endpoints = require("./js/endpoints.js");


var Client = function (configuration) {
  this.endpoints = new Endpoints();
};

Client.prototype = {

  generateAliases: function () {

    var Alias = function (endpoint, endpointsObj) {
      return function(args) {
        return endpointsObj[endpoint].prepareReq(args);
      };
    };

    var endpointsObj = this.endpoints;
    /*If namespace available, creates a shorthand reference to endpoint
    call method*/
    for (var property in this.endpoints) {
      if (endpointsObj.hasOwnProperty(property) &&
        "undefined" === typeof this[property]) {
          this[property] = new Alias(property, endpointsObj);
      }
    }
    return;
  }
};

module.exports = Client;