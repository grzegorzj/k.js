var underscore = require("underscore");
var $ = require("jquery");

var Endpoint = function (body) {
  this.body = body;
};

Endpoint.prototype = {
  validateInput: function (params) {
    var that = this;
    var input_validators;

    /*For each input, perform defined validations*/
    _.each(params, function (param) {
      /*Assumes one, we are iterating*/
      var key = Object.keys(param)[0];
      var value = param[key];

      var inputs = _.pluck(that.body.input, "name");

      /*Check if the field(input) should be sent any further*/
      if (inputs.indexOf(key) > -1) {
        input_validators = that.body.input[key].validators;
        input_validators.map(function (inputValidator) {
          validation = typeof validators[inputValidator.name] === "function" ?
            validators[inputValidator.name](value, inputValidator.options) :
            undefined;
          if (validation !== true) {
            console.log(validation ? validation :
              "Validator " + inputValidator.name + " was not defined.");
            return validation ? validation : false;
          }
        });
      } else {
        /*Prune redundant inputs*/
        delete params[param];
      }
    });

    /*If no inputs are left after pruning redundant, validation fails*/
    return Boolean(Object.keys(params).length);
  },

  prepareRequest: function (params) {
    var that = this;

    var generateUrl = function (url, params) {
      /*Replaces each %s with corresponding URI Component,
      in the order of occurence in 'input' array*/
      if(uri_components.length){
        url = url.replace(/\%s/g, "|%s|").split("|");
        var i, j = 0;

        for (i; i <= url.length; i++) {
          if ("%s" === url[i]) {
            url[i] = encodeURIComponent(parameters[uri_components[j]]);
            j++;
          }
        }

        url = url.join("");
      }
      return url;
    };

    var uri_components = _.pluck(
        _.where(that.body.input, {"type": "uri_component"}),
        "name"
      );

    var request_keys = _.filter(that.body.input, function (item) {
        return item.type != "uri_component";
      });
    request_keys =  _.pluck(request_keys, "name");

    var request_data = _.extend({}, params);

    return this.go(
      this.body.method,
      generateUrl(this.endpoint.url, uri_components, params),
      request_data
    );

  },

  performRequest: function (method, endpoint, params) {
    var url = APIURL + endpoint + "/";

    return $.ajax({
      headers: {
        "Accept" : "application/json"
      },
      dataType: "json",
      type: method,
      url: url,
      data: query,
      contentType: "application/json; charset=utf-8"
    });
  },

  go: function (params) {
    if (this.validateInput(params)) {
      /*Ultimate method that actually calls the API*/
      return this.performRequest(
        this.body.method,
        this.body.url,
        params
      );
    } else {
      return $.Deferred().reject("Request was not performed due to failed validation.");
    }
  }
};

module.exports = Endpoint;