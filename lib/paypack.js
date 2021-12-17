"use strict";

require("./methods");
require("./utils");

class Paypack {
  constructor({ client_id, client_secret }) {
    if (!client_id || !client_secret) throw "Application secrets required.";
    this.secrets.client_id = client_id;
    this.secrets.client_secret = client_secret;
    (async () => {
      await authenticate();
    })();
  }

  static async initialize({ client_id, client_secret }) {
    if (!client_id || !client_secret) throw "Application secrets required.";

    this.secrets.client_id = client_id;
    this.secrets.client_secret = client_secret;

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
