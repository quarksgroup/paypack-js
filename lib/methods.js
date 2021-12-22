"use strict";

const { http } = require("./http");
const { token, secrets, getQueryString, isPhoneNumber } = require("./utils");

/**
 * Authenticates SDK
 * @return {object}
 */
exports.authenticate = async () =>
  new Promise(async (resolve, reject) => {
    try {
      this.checkSecrets();
      const res = await http.post("auth/agents/authorize", {
        client_id: secrets.client_id,
        client_secret: secrets.client_secret,
      });

      if (res.data) {
        token.access = res.data.access;
        token.refresh = res.data.refresh;
      }

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

/**
 * Fetch transactions according to filter parameters
 * @param {string} limit limit of transactions to fetch default is 20
 * @param {string} offset offset of transactions to fetch
 * @param {string} from starting date range of transactions to fetch
 * @param {string} to ending date range of transactions to fetch
 * @param {string} kind kind of transactions to fetch eg: CASHIN or CASHOUT
 * @param {number} client transactions for a specific client
 * @return {object}
 */
exports.transactions = async (filters) =>
  new Promise(async (resolve, reject) => {
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
 * @param {string} ref transaction ref
 * @return {object}
 */
exports.transaction = async (ref) =>
  new Promise(async (resolve, reject) => {
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
 * Initiates a cashin
 * @param {string} amount amount to cashin
 * @param {number} number phone number to cashin
 * @return {object}
 */
exports.cashin = async ({ amount, number }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!amount) {
        throw new Error({ message: "Amount to cashin is required" });
      }

      if (amount < 100) {
        throw new Error({ message: "Minimum to cashin is 100 RWF" });
      }

      if (!number) {
        throw new Error({ message: "Phone number to cashin is required" });
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
 * Initiates a cashout
 * @param {string} amount amount to cashout
 * @param {number} number phone number to cashout
 * @return {object}
 */
exports.cashout = async ({ amount, number }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!amount)
        throw new Error({ message: "Amount to cashout is required" });

      if (amount < 100)
        throw new Error({ message: "Minimum to cashout is 100 RWF" });

      if (!number)
        throw new Error({ message: "Phone number to cashout is required" });

      if (!isPhoneNumber(number))
        throw new Error({ message: "Invalid phone number" });
      const res = await http.post(`transactions/cashout`, { amount, number });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

/**
 * Fetch events according to filter parameters
 * @param {string} limit limit of events to fetch default is 20
 * @param {string} offset offset of events to fetch
 * @param {string} from starting date range of events to fetch
 * @param {string} to ending date range of events to fetch
 * @param {string} kind kind of events to fetch eg: CASHIN or CASHOUT
 * @param {number} client events for a specific client
 * @param {string} ref events for a specific transaction ref
 * @param {string} status events with a specific status eg: pending or successfull or failed
 * @return {object}
 */
exports.events = async (filters) =>
  new Promise(async (resolve, reject) => {
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
 * Provides a profile of authenticated user
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
 * cheks SDK secrets availability
 * @return {void}
 */
exports.checkSecrets = () => {
  if (!secrets.client_id) {
    throw new Error({ message: "Application id is required to authenticate." });
  }

  if (!secrets.client_secret) {
    throw new Error({
      message: "Application secret is required to authenticate.",
    });
  }
};

/**
 * Sets SDK secrets
 * @param  {string}  client_id
 * @param  {string}  client_secret
 * @return {void}
 */
exports.setSecrets = ({ client_id, client_secret }) => {
  if (!client_id || !client_secret) {
    throw new Error({ message: "Application secrets required" });
  }

  secrets.client_id = client_id;
  secrets.client_secret = client_secret;
};
