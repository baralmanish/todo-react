export const ENV = import.meta.env;
export const API_PREFIX = ENV.VITE_API_URL;
export const MY_STORAGE = window.localStorage;

export const DEFAULT_USER_AUTH_KEY = "trackManagementUser";

export const URL = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/"
};
