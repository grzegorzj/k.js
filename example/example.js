var fs = require("fs");
var api = fs.readFileSync(__dirname + "/endpoints.example.json", "utf8")

var Client = require("../js/endpoints.js");
/*Here one can go with either AJAX request, or pre-bundled
JSON*/

global.dribbble = new Client("http://api.dribbble.com", api);