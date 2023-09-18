"use strict";

const axios = require("axios");
const utils = require("./utils.js");

const axiosInstance = axios.create({
  baseURL: "https://payments.paypack.rw/api/",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!utils.isAuthenticated()) {
      if (config.url.includes("auth/agents/authorize")) return config;
      else await authenticate();
    }

    if (utils.getAccessToken()) {
      config.headers["Authorization"] = utils.getAccessToken();
    }

    return config;
  },

  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  async (error) => {
    try {
      if (error.response) {
        const originalRequest = error.config;
        if (error.response.status === 401) {
          if (originalRequest.url.includes("auth/agents/authorize")) {
            throw error.response.data || error.response;
          }

          if (!originalRequest._retry) {
            originalRequest._retry = true;
            const access_Token = await refreshAccessToken();
            originalRequest.headers["Authorization"] = access_Token;

            return axiosInstance(originalRequest);
          } else if (originalRequest._retry) {
            token.access = null;
            token.refresh = null;
            throw new Error("Refresh token expired, please authenticate again");
          } else {
            throw error.response.data || error.response;
          }
        } else {
          throw error.response.data || error.response;
        }
      } else {
        throw error;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

/**
 * Authenticates SDK
 * @return {object}
 */
async function authenticate() {
  return await new Promise(async (resolve, reject) => {
    try {
      utils.checkSecrets();
      const res = await axiosInstance.post("auth/agents/authorize", utils.getSecrets());

      if (res.data) {
        utils.setTokens(res.data);
        utils.setAuthenticationState(true);
      }

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Refreshes expired tokens
 * @return {string}
 */
async function refreshAccessToken() {
  const refreshToken = utils.getRefreshToken();
  if (!refreshToken) return null;
  axiosInstance
    .get(`auth/refresh/${refreshToken}`)
    .then((res) => {
      if (res.data) {
        utils.setTokens(res.data);
        return res.data.access;
      }
      return null;
    })
    .catch((error) => {
      throw error;
    });
}

module.exports = axiosInstance;
