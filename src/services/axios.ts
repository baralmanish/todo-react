import axios, { AxiosError, AxiosResponse } from "axios";
import { API_PREFIX } from "../utils/constants";

const API = axios.create({
  baseURL: API_PREFIX,
  timeout: 6000 * 5
});

API.defaults.headers.get["Accept"] = "application/json";
API.defaults.headers.post["Accept"] = "application/json";
API.defaults.headers.post["Content-Type"] = "application/json";

API.interceptors.response.use(
  (response) => responseSuccessHandler(response),
  (error) => responseErrorHandler(error)
);

const responseSuccessHandler = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const responseErrorHandler = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export default API;
