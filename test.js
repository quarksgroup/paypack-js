const Paypack = require("./index");

Paypack.initialize({
  client_id: "6e40b196-5f5c-11ec-869a-dead65a27528",
  client_secret:
    "6963545a8856aab4144ac5f42523fc90da39a3ee5e6b4b0d3255bfef95601890afd80709",
});

Paypack.events()
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
