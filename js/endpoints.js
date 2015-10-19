var validators = require("validators.js");
var transforms = require("transforms.js");

var Endpoints = function (APIURL) {
  var Endpoint = function (body) {
    this.body = body;
  };

  Endpoint.prototype = {
    validateInput: function (params) {
      var that = this;
      var input_validators;

      _.each(params, function (param, value) {
        if (that.body.input.hasOwnProperty(param)) {
          input_validators = that.body.input[param].validators;
          input_validators.map(function (inputValidator) {
            validation = typeof validators[inputValidator.name] === "function" ?
              validators[inputValidator.name](value, inputValidator.options) :
              undefined;
            if (validation !== true) {
              console.log(validation ? validation :
                "Validator " + inputValidator.name + " was not defined.");
              return false;
            }
          });
        } else {
          /*Prune redundant parameter*/
          delete params[param];
        }
      });
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
      var url = config.api.url.protocol + "://" + config.api.url.root_url +
        ":" + config.api.url.port + "/" + config.api.url.version + "/" +
        endpoint + "/";

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

    go: function (method, endpoint, params) {
      if (this.validateInput(params, validators)) {
        /*Ultimate method that actually calls the API*/
        return this.performRequest(method, endponit, params);
      } else {
        /*Deferred*/
      }
    }
  };

  /*Instantiate endpoints*/
  var endpoints = JSON.parse(EndpointsList);
  _.each(endpoints, function(endpoint) {
    if(!that.hasOwnProperty(endpoint.alias)) {
      that[endpoint.alias] = new Endpoint(endpoint);
    }
  });
};

module.exports = Endpoints;
