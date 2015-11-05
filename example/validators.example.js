var validators = {
  required: function(value) {
    var validation;

    switch (typeof value) {
      case "object":
        validation = value != null;
        break;
      case "undefined":
        validation = false;
        break;
      case "function":
        validation = true;
      case "string":
        validation = Boolean(value.lenght);
        break;
      default:
        validation = false;
        break;
     }
     return validation;
  }
};

module.exports = validators;