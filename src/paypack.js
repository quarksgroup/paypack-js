"use strict";

const methods = require("./methods");
const utils = require("./utils");

class Paypack {
  constructor(config) {
    if (config) utils.setSecrets(config);
  }

  static config(config) {
    if (this instanceof Paypack) {
      utils.setSecrets(config);
      return this;
    } else {
      return new Paypack(config);
    }
  }
}

utils.forEach(Object.keys(methods), (method) => {
  Paypack.prototype[method] = methods[method];
});

module.exports = Paypack;
