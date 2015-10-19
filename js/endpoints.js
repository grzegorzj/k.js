var validator = require("validators.js");

var Endpoints = function (APIConfig) {

  var Endpoint = function (body) {
    this.body = body;
  }

  Endpoint.prototype = {
    validateInput: function(params) {
      var validators = this.body.input.validators;
      validators.map(function (validator) {

      });
    },

    prepareRequest: function () {
      var generateUrl = function (url, params) {
        return;
      }

    },

    performRequest: function() {

    },

    go: function(params) {
      /*Ultimate method that actually calls the API*/
      if (this.body.input.validators.length) {
        this.validateInput(params);
      }

      return this.performRequest(params);
    }
  }
}

module.exports = Ednpoints;