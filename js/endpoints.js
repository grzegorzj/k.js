var validator = require("validators.js");

var Endpoints = function (APIConfig) {

  var Endpoint = function (body) {
    this.body = body;
  }

  Endpoint.prototype = {
    validateInput: function(params) {
      _.each(params, function(param, value) {
        return;
      });
    },

    prepareRequest: function () {
      var generateUrl = function (url, params) {
        return;
      }

    },

    performRequest: function() {
      return;
    },

    go: function(params) {
      var validators = _.pluck(this.body.input, "validators");
      /*Ultimate method that actually calls the API*/
      if (validators) {
        this.validateInput(params);
      }

      return this.performRequest(params);
    }
  }
}

module.exports = Ednpoints;