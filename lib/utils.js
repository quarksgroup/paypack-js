const { omitBy, isNil } = require("lodash");

exports.secrets = {
  client_id: null,
  client_secret: null,
};
exports.token = {
  access: null,
  refresh: null,
};
exports.getQueryString = (obj) => {
  if (!obj) return "";
  if (obj && typeof obj != "object")
    throw new TypeError("Filter parameters should be of type object.");
  if (obj.limit && !obj.offeset) obj.offeset = 0;
  return Object.entries(omitBy(obj, isNil))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

exports.isPhoneNumber = (number) => {
  const errors = {
    format: false,
  };

  // Check it's a string
  // -----------------------------------------
  if (typeof number !== "string") {
    throw new Error("Input should be string");
  }

  const re = /^(\+?25)?(078|079|075|073|072)\d{7}$/;
  if (!re.test(number)) {
    return errors.format;
  }
  return true;
};
