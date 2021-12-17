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
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            originalRequest._relogin = false;
            const access_Token = await refreshAccessToken();
            originalRequest.headers["Authorization"] = access_Token;
            return axiosInstance(originalRequest);
          } else if (originalRequest._retry && !originalRequest._relogin) {
            await authenticate();
            return axiosInstance(originalRequest);
          } else if (originalRequest._retry && originalRequest._relogin) {
            token.access = null;
            token.refresh = null;
            throw new Error("Refresh tokens expired, authenticate again.");
          } else {
            throw error;
          }
        } else {
          throw error;
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

async function authenticate() {
  try {
    if (!secrets.client_id)
      throw new Error("Application id is required to authenticate.");
    if (!secrets.client_secret)
      throw new Error("Application secret is required to authenticate.");
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
}

exports.http = axiosInstance;
