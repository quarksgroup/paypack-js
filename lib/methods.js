"use strict";

const { http } = require("./http");
const { token, secrets, getQueryString, isPhoneNumber } = require("./utils");

exports.authenticate = async () => {
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
  } catch (e) {
    return e;
  }
};

exports.transactions = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(
        `transactions/list?${getQueryString(filters)}`
      );

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

exports.transaction = async (trxId) => {
  if (!trxId) reject(new Error("Transaction ref is required"));
  if (typeof trxId != "string")
    reject(new Error("Transaction ref must be a string"));
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(`transactions/find/${trxId}`);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

exports.cashin = async ({ amount, phone }) => {
  if (!amount) reject(new Error("Amount to cashin is required"));
  if (amount < 100) reject(new Error("Minimum to cashin is 100 RWF"));
  if (!phone) reject(new Error("Phone number to cashin is required"));
  if (!isPhoneNumber(phone)) reject(new Error("Invalid phone number"));

  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(`transactions/cashin`, { amount, phone });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

exports.cashout = async ({ amount, phone }) => {
  if (!amount) reject(new Error("Amount to cashout is required"));
  if (amount < 100) reject(new Error("Minimum to cashout is 100 RWF"));
  if (!phone) reject(new Error("Phone number to cashout is required"));
  if (!isPhoneNumber(phone)) reject(new Error("Invalid phone number"));

  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(`transactions/cashout`, { amount, phone });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

exports.events = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(
        `events/transactions?${getQueryString(filters)}`
      );
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

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

exports.checkSecrets = () => {
  if (!secrets.client_id)
    throw new Error("Application id is required to authenticate.");
  if (!secrets.client_secret)
    throw new Error("Application secret is required to authenticate.");
};
