"use strict";

const { http } = require("./http");
const { secrets, getQueryString, isPhoneNumber } = require("./utils");

/**
 * Fetch transactions according to filter parameters
 *
 * @property {string} limit limit of transactions to fetch default is 20
 * @property {string} offset offset of transactions to fetch
 * @property {string} from starting date range of transactions to fetch
 * @property {string} to ending date range of transactions to fetch
 * @property {string} kind kind of transactions to fetch eg: CASHIN or CASHOUT
 * @property {number} client transactions for a specific client
 *
 * @return {object}
 */
exports.transactions = async (filters) =>
  await new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(
        `transactions/list?${getQueryString(filters)}`
      );

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

/**
 * Fetch transaction according to the transaction ref
 *
 * @param {string} ref transaction ref
 *
 * @return {object}
 */
exports.transaction = async (ref) =>
  await new Promise(async (resolve, reject) => {
    try {
      if (!ref) {
        throw new Error({ message: "Transaction ref is required" });
      }

      if (typeof ref != "string") {
        throw new Error({ message: "Transaction ref must be a string" });
      }

      const res = await http.get(`transactions/find/${ref}`);

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

/**
 * Initiates a cashin.
 *
 * @property {string} amount amount to cashin
 * @property {number} number phone number to cashin
 *
 * @return {object}
 */
exports.cashin = async (params) =>
  await new Promise(async (resolve, reject) => {
    try {
      if (!params) throw new Error("Invalid cashin parameters");

      let {
        amount = new Error({ message: "property 'amount' is required" }),
        number = new Error({ message: "property 'number' is required" }),
      } = params;

      if (amount < 100) {
        throw new Error({ message: "Minimum to cashin is 100 RWF" });
      }

      if (Number(amount) == NaN) {
        throw new Error({
          message: "invalid amount",
        });
      } else amount = Number(amount);

      if (typeof number !== "string") {
        throw new TypeError({
          message: "property 'number' must be of type string",
        });
      }

      if (!isPhoneNumber(number)) {
        throw new Error({ message: "Invalid phone number" });
      }

      const res = await http.post(`transactions/cashin`, { amount, number });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

/**
 * Initiates a cashout request.
 *
 * @property {string} amount amount to cashout
 * @property {number} number phone number to cashout
 *
 * @return {object}
 */
exports.cashout = async (params) =>
  await new Promise(async (resolve, reject) => {
    try {
      if (!params) throw new Error("Invalid cashout parameters");

      let {
        amount = new Error({ message: "property 'amount' is required" }),
        number = new Error({ message: "property 'number' is required" }),
      } = params;

      if (amount < 100) {
        throw new Error({ message: "minimum to cashout is 100 RWF" });
      }

      if (Number(amount) == NaN) {
        throw new Error({
          message: "invalid amount",
        });
      } else amount = Number(amount);

      if (typeof number !== "string") {
        throw new TypeError({
          message: "property 'number' must be of type string",
        });
      }

      if (!isPhoneNumber(number)) {
        throw new Error({ message: "Invalid phone number" });
      }

      const res = await http.post(`transactions/cashout`, { amount, number });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

/**
 * Fetch events according to filter parameters.
 *
 * @property {string} limit limit of events to fetch default is 20
 * @property {string} offset offset of events to fetch
 * @property {string} from starting date range of events to fetch
 * @property {string} to ending date range of events to fetch
 * @property {string} kind kind of events to fetch eg: CASHIN or CASHOUT
 * @property {number} client events for a specific client
 * @property {string} ref events for a specific transaction ref
 * @property {string} status events with a specific status eg: pending or successfull or failed
 *
 * @return {object}
 */
exports.events = async (filters) =>
  await new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(
        `events/transactions?${getQueryString(filters)}`
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

/**
 * Provides a profile of authenticated user.
 *
 * @return {object}
 */
exports.me = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(`merchants/me`);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Sets SDK secrets
 *
 * @property  {string}  client_id
 * @property  {string}  client_secret
 *
 * @return {void}
 */
exports.setSecrets = ({ client_id, client_secret }) => {
  if (!client_id || !client_secret) {
    throw new Error({ message: "Application secrets required" });
  }

  secrets.client_id = client_id;
  secrets.client_secret = client_secret;
};
