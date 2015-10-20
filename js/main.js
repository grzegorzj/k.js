var underscore = require("underscore");
var jQuery = require("jquery")(global);

var Endpoints = require("./endpoints.js");

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