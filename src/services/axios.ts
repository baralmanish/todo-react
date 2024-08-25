import axios, { AxiosError, AxiosResponse } from "axios";

import { clearStorage } from "../utils/helpers";
import AuthService from "../services/auth.service";
import { API_PREFIX, URL } from "../utils/constants";

const API = axios.create({
  baseURL: API_PREFIX,
  timeout: 6000 * 5
});

API.defaults.headers.get["Accept"] = "application/json";
API.defaults.headers.post["Accept"] = "application/json";
API.defaults.headers.post["Content-Type"] = "application/json";

API.interceptors.request.use((config) => {
  const user = AuthService.getUser();
  if (user?.token && config) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => responseSuccessHandler(response),
  (error) => responseErrorHandler(error)
);

const responseSuccessHandler = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const responseErrorHandler = (error: AxiosError) => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  if (error?.response?.status === 401) {
    const url = URL.LOGIN;
    clearStorage();
    return window.location.replace(url);
  }

  return Promise.reject(error);
};

export default API;
