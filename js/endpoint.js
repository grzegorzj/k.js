var underscore, _ = require("underscore");
var $ = require("jquery");

var Endpoint = function (body, config) {
  this.body = body;
  this.config = config;
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
        input_validators = _.findWhere(that.body.input, {"name": key}).validators;

        input_validators.map(function (inputValidator) {
          validation = typeof validators[inputValidator.name] === "function" ?
            validators[inputValidator.name](value, inputValidator.options) :
            undefined;
          if (validation !== true) {
            console.error(validation ? validation :
              "Validator " + inputValidator.name + " was not defined.");
            return validation ? validation : false;
          }
        });
      } else {
        /*Prune redundant inputs*/
        delete params[key];
      }
    });

    /*If no inputs are left after pruning redundant, validation fails*/
    return {
      result: Boolean(Object.keys(params).length),
      params: params
    };
  },

  prepareRequest: function (params) {
    var that = this;

    /*This method generates URL (includes URI components) and passes prepared data
    to go method*/

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
    var url = [this.config.api_url, endpoint, "/"].join("");

    method = method.toUpperCase();

    if (method !== "GET") {
      params = JSON.stringify(params);
    }

    return $.ajax({
      headers: {
        "Accept" : "application/json"
      },
      dataType: "json",
      type: method,
      url: url,
      data: params,
      contentType: "application/json; charset=utf-8"
    });
  },

  go: function (params) {
    /*This method runs the validation,
    and if is sucessful, performs the request*/

    /*TODO debug mode without validation*/
    var validation = this.validateInput(params);
    if (validation) {
      /*Ultimate method that actually calls the API*/
      return this.performRequest(
        this.body.method,
        this.body.url,
        validation.params
      );
    } else {
      return $.Deferred().reject("Request was not performed due to failed validation.");
    }
  }
};

module.exports = Endpoint;