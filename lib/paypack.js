"use strict";

require("./methods");

class Paypack {
  /**
   * Initialize paypack and authenticate
   * @param  {string} client_id
   * @param  {string} client_secret
   * @return {void}
   */
  constructor({ client_id, client_secret }) {
    setSecrets({ client_id, client_secret });
    (async () => {
      return await authenticate();
    })();
  }

  /**
   * Initialize paypack and authenticate
   * @param  {string} client_id
   * @param  {string} client_secret
   * @return {void}
   */
  static async initialize({ client_id, client_secret }) {
    this.setSecrets({ client_id, client_secret });
    await this.authenticate();
  }
}

(function init() {
  Object.assign(
    Paypack,
    module.children.reduce((n, a) => Object.assign(n, a.exports), {})
  );
})();

module.exports = Paypack;
