var fs = require("fs");
var api = fs.readFileSync(__dirname + "/endpoints.example.json", "utf8")

var Client = require("../js/endpoints.js");
var validators = require("./validators.example.js");

/*Here one can go with either AJAX request, or pre-bundled
JSON; in this example, JSON is required by fs (brfs plugin takes case of it being precompiled)*/
global.dribbble = new Client({
  config: {
    api_url: "https://api.dribbble.com/v1/"
  },
  endpointsList: api,
  validators: validators
});

dribbble.authenticate({
  "access_token": "12345"
}).done(function (response) {
  console.log(response);
}).fail(function (reason){
  console.error(reason);
});