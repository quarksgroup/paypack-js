"use strict";

const { default: axios } = require("axios");
const { token, secrets } = require("./utils.js");

const axiosInstance = axios.create({
  baseURL: "https://payments.paypack.rw/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (token.access) {
      config.headers["Authorization"] = token.access;
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
          if (originalRequest.url.includes("authorize")) {
            return Promise.reject(error);
          }
          if (!originalRequest._retry) {
            originalRequest._retry = true;

            const access_Token = await refreshAccessToken();
            originalRequest.headers["Authorization"] = access_Token;

            return axiosInstance(originalRequest);
          } else if (originalRequest._retry) {
            token.access = null;
            token.refresh = null;
            throw new Error({
              message: "Refresh tokens expired, authenticate again",
            });
          } else {
            throw error;
          }
        } else {
          throw error.response.data || error;
        }
      } else {
        throw error;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
);
async function refreshAccessToken() {
  if (!token.refresh) return null;
  axiosInstance
    .get(`auth/refresh/${token.refresh}`)
    .then((res) => {
      if (res.data) {
        token.access = res.data.access;
        token.refresh = res.data.refresh;
        return res.data.access;
      }
      return null;
    })
    .catch((error) => {
      throw error;
    });
}

exports.http = axiosInstance;
