const { omitBy, isNil } = require('lodash');

let secrets = {
  client_id: null,
  client_secret: null,
};

let token = {
  access: null,
  refresh: null,
};

let state = {
  isLoggedIn: false,
};

/**
 * Get application access token
 * 
 * @return {string}
 */
function getAccessToken() {
  return token.access;
}

/**
 * Get application refresh token
 * 
 * @return {string}
 */
function getRefreshToken() {
  return token.refresh;
}

/**
 * Set application tokens
 * 
 * @param {string} access_token
 * @param {string} refresh_token
 */
function setTokens({ access, refresh }) {
  token.access = access;
  token.refresh = refresh;
}

/**
 * Checks if the SDK is authenticated
 * 
 * @return {boolean}
 * 
 */
function isAuthenticated() {
  return state.isLoggedIn;
}

/**
 * sets SDK authentication state
 */
function setAuthenticationState(_state) {
  state.isLoggedIn = _state;
}

/**
 * Formats the query object into a string
 * @param {string} param query parameters
 * @return {string}
 */
function getQueryString(param) {
  if (!param) return "";

  if (param && typeof param != "object")
    throw new TypeError("Filter parameters should be of type object.");

  if (param.limit && !param.offset) param.offset = 0;

  return Object.entries(omitBy(param, isNil))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

/**
 * Validates if a number is a rwandan phone
 * @param {string} number phone number to validate
 * @return {boolean}
 */
function isPhoneNumber(number) {
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
}

/**
 * Gets application secrets
 * 
 * @return {object}
 */
function getSecrets() {
  return secrets;
}

/**
 * cheks SDK secrets availability
 * @return {void}
 */
function checkSecrets() {
  if (!secrets.client_id) {
    throw new Error("Client id is required to authenticate.");
  }

  if (!secrets.client_secret) {
    throw new Error("Client secret is required to authenticate.");
  }
}

/**
 * Sets SDK secrets
 * 
 * @param {string} client_id
 * @param {string} client_secret
 * 
 * @return {void}
 */
function setSecrets({ client_id, client_secret }) {
  if (!client_id || !client_secret) {
    throw new Error("Application secrets required");
  }

  secrets.client_id = client_id;
  secrets.client_secret = client_secret;
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (Array.isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

module.exports = {
  getAccessToken,
  getRefreshToken,
  setTokens: setTokens,
  isAuthenticated: isAuthenticated,
  setAuthenticationState: setAuthenticationState,
  getQueryString: getQueryString,
  isPhoneNumber: isPhoneNumber,
  getSecrets: getSecrets,
  checkSecrets: checkSecrets,
  setSecrets: setSecrets,
  forEach: forEach,
};