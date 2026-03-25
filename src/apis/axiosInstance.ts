import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/cookies";
import { storageKeys } from "../utils/enum";
import { API_CONSTANTS } from "./apiConstants";
import { refreshAccessTokenRequest } from "./authRefresh";

const getBaseUrl = (name?: string) => {
  switch (name) {
    case "auth":
      return process.env.NEXT_PUBLIC_API_URL;
    default:
      return process.env.NEXT_PUBLIC_API_URL;
  }
};

function isAuthRefreshRequest(config: { url?: string }) {
  const url = config.url ?? "";
  return url.includes(API_CONSTANTS.refreshToken);
}

/** Single in-flight refresh so concurrent 401s share one token rotation. */
let refreshInFlight: Promise<{
  accessToken: string;
  refreshToken?: string;
} | null> | null = null;

function getSharedRefreshPromise() {
  if (!refreshInFlight) {
    refreshInFlight = refreshAccessTokenRequest().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

function clearSessionAndRedirectLogin() {
  removeCookie(storageKeys.ACCESS_TOKEN);
  removeCookie(storageKeys.REFRESH_TOKEN);
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

const axiosInstance = (serviceName?: string) => {
  const instance = axios.create({
    baseURL: getBaseUrl(serviceName),
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      config.headers["ngrok-skip-browser-warning"] = "server";

      const token = getCookie(storageKeys.ACCESS_TOKEN);
      const accessToken =
        typeof token === "string"
          ? token
          : token &&
            typeof token === "object" &&
            token !== null &&
            "accessToken" in token
            ? String((token as { accessToken?: string }).accessToken ?? "")
            : null;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (err) => Promise.reject(err),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (!error.response || !originalRequest) {
        return Promise.reject(error);
      }

      const status = error.response.status;

      /**
       * Error codes (backend):
       * 901: Invalid refresh token
       * 905: Refresh token expired
       * 401: Unauthorized
       */
      if (status !== 401) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // Avoid loop if refresh endpoint itself was called via this instance
      if (isAuthRefreshRequest(originalRequest)) {
        clearSessionAndRedirectLogin();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const res = await getSharedRefreshPromise();

        if (!res?.accessToken) {
          clearSessionAndRedirectLogin();
          return Promise.reject(
            error instanceof Error ? error : new Error("Session expired"),
          );
        }

        setCookie(storageKeys.ACCESS_TOKEN, res.accessToken);
        if (res.refreshToken) {
          setCookie(storageKeys.REFRESH_TOKEN, res.refreshToken);
        }

        const newAccessToken = res.accessToken;
        instance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch {
        clearSessionAndRedirectLogin();
        return Promise.reject(
          error instanceof Error
            ? error
            : new Error("An unexpected error occurred during token refresh"),
        );
      }
    },
  );
  return instance;
};

export default axiosInstance;
