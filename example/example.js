var fs = require("fs");
var api = fs.readFileSync(__dirname + "/endpoints.example.json", "utf8")

var Client = require("../js/endpoints.js");

/*Here one can go with either AJAX request, or pre-bundled
JSON*/
global.dribbble = new Client("https://api.dribbble.com/v1/", api);
dribbble.authenticate().done(function (response) {
  console.log(response);
}).fail(function (reason){
  console.log(reason);
});