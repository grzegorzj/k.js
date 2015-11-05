var underscore, _ = require("underscore");
var $ = require("jquery");

var Endpoint = require("./endpoint.js");

var Client = function (options) {
  /*
  {
    config: {}.
    endpointsList: [],
    validators: []
  }
  */

  var that = this;
  this.endpoints = {};

  /*Take options*/
  $.extend(this, options);

  /*Register validators*/
  _.each(this.validators, function (validator, key) {
    that.registerValidator(validator, key);
  });

  /*Instantiate endpoints*/
  var endpoints = JSON.parse(this.endpointsList);
  _.each(endpoints, function(endpoint) {
    /*Instantiate Endpoint object*/
    that.endpoints[endpoint.alias] = new Endpoint(endpoint, that.config);
    /*Create alias*/
    if(!that.hasOwnProperty(endpoint.alias)) {
      that[endpoint.alias] = (function(that) {
        return function (params) {
          return that.endpoints[endpoint.alias].go(params);
        };
      })(that);
    }
  });
};

Client.prototype = {
  registeredValidators: {},

  registerValidator: function (validator, name) {
    if(typeof validator !== "function") {
      console.error("Argument passed as a validator must be a function!");
    }

    this.registeredValidators[name] = validator;
  }
};

module.exports = Client;
