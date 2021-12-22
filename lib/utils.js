const { omitBy, isNil } = require("lodash");
const EventEmitter = require("events");

exports.secrets = {
  client_id: null,
  client_secret: null,
};
exports.token = {
  access: null,
  refresh: null,
};

/**
 * Formats the query object into a string
 * @param {string} param query parameters
 * @return {string}
 */
exports.getQueryString = (param) => {
  if (!param) return "";
  if (param && typeof param != "object")
    throw new TypeError("Filter parameters should be of type object.");
  if (param.limit && !param.offeset) param.offeset = 0;
  return Object.entries(omitBy(param, isNil))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

/**
 * Validates if a number is a rwandan phone
 * @param {string} number phone number to validate
 * @return {boolean}
 */
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

exports.state = {
  isLoggedIn: false,
  loggedInEvent: new EventEmitter(),
};
