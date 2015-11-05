var validators = {
  required: function(value) {
    if (typeof value === "object") {
      /*Passess if not null, even if empty object given*/
      return value != null;
    } else if (typeof value === "function") {
      return true;
    } else {
      return Boolean(value.length);
    }
  }
};

module.exports = validators;