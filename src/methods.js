"use strict";

const http = require("./http");
const utils = require("./utils");

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
async function transactions(filters) {
  return await new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(
        `transactions/list?${utils.getQueryString(filters)}`
      );

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Fetch transaction according to the transaction ref
 *
 * @param {string} ref transaction ref
 *
 * @return {object}
 */
async function transaction(ref) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (!ref) {
        throw new Error("Transaction ref is required to fetch transaction");
      }

      if (typeof ref != "string") {
        throw new TypeError("Transaction reference must be a string type");
      }

      const res = await http.get(`transactions/find/${ref}`);

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Initiates a cashin.
 *
 * @property {string} amount amount to cashin
 * @property {number} number phone number to cashin
 *
 * @return {object}
 */
async function cashin(params) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (!params) throw new Error("Cashin parameters are required");

      let {
        amount = new Error("Property 'amount' is required to cashin"),
        number = new Error("Property 'number' is required to cashin"),
        environment = null,
      } = params;

      if (Number(amount) == NaN) throw new TypeError("Property 'amount' must be a number type");
      else amount = Number(amount);

      if (amount < 100) {
        throw new Error("Minimum to cashin is 100 RWF");
      }

      if (typeof number !== "string") {
        throw new TypeError("Property 'number' must a string type");
      }

      if (!utils.isPhoneNumber(number)) {
        throw new Error("Invalid phone number");
      }

      const res = await http.post(
        `transactions/cashin`,
        { amount, number },
        {
          headers: {
            "X-Webhook-Mode": environment,
          },
        }
      );

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Initiates a cashout request.
 *
 * @property {string} amount amount to cashout
 * @property {number} number phone number to cashout
 *
 * @return {object}
 */
async function cashout(params) {
  return await new Promise(async (resolve, reject) => {
    try {
      if (!params) throw new Error("Cashout parameters are required");

      let {
        amount = new Error("Property 'amount' is required to cashout"),
        number = new Error("Property 'number' is required to cashout"),
        environment = null,
      } = params;

      if (Number(amount) == NaN) throw new TypeError("Property 'amount' must be a number type");
      else amount = Number(amount);

      if (amount < 100) {
        throw new Error("Minimum to cashout is 100 RWF");
      }

      if (typeof number !== "string") {
        throw new TypeError("Property 'number' must a string type");
      }

      if (!utils.isPhoneNumber(number)) {
        throw new Error("Invalid phone number");
      }

      const res = await http.post(
        `transactions/cashout`,
        { amount, number },
        {
          headers: {
            "X-Webhook-Mode": environment,
          },
        }
      );

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

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
async function events(filters) {
  return await new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(
        `events/transactions?${utils.getQueryString(filters)}`
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Provides a profile of authenticated user.
 *
 * @return {object}
 */
async function me() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(`merchants/me`);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  transactions: transactions,
  transaction: transaction,
  cashin: cashin,
  cashout: cashout,
  events: events,
  me: me,
};