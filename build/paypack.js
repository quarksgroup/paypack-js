"use strict";

const methods = require("./methods");
const utils = require("./utils");
class Paypack {
  constructor(config) {
    if (config) utils.setSecrets(config);
  }
  config(config) {
    return new Paypack(config);
  }
}
utils.forEach(Object.keys(methods), method => {
  Paypack.prototype[method] = methods[method];
});
module.exports = Paypack;
//# sourceMappingURL=paypack.js.map
