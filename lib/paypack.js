"use strict";

require("./methods");

class Paypack {
  /**
   * set paypack configuraions with application secrets
   * @param  {string} client_id
   * @param  {string} client_secret
   * @return {void}
   */
  static async config({ client_id, client_secret }) {
    this.setSecrets({ client_id, client_secret });
  }
}

(function init() {
  Object.assign(
    Paypack,
    module.children.reduce((n, a) => Object.assign(n, a.exports), {})
  );
})();

module.exports = Paypack;
