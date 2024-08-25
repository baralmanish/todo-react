import axios, { AxiosError, AxiosResponse } from "axios";

import { clearStorage } from "../utils/helpers";
import AuthService from "../services/auth.service";
import { API_PREFIX, URL } from "../utils/constants";

// Create an Axios instance with default configurations
const API = axios.create({
  baseURL: API_PREFIX, // Base URL for the API
  timeout: 6000 * 5 // Request timeout set to 30 seconds
});

// Set default headers for GET and POST requests
API.defaults.headers.get["Accept"] = "application/json";
API.defaults.headers.post["Accept"] = "application/json";
API.defaults.headers.post["Content-Type"] = "application/json";

// Request interceptor to add authentication token to headers if available
API.interceptors.request.use((config) => {
  const user = AuthService.getUser(); // Retrieve user information

  // Check if token exists
  if (user?.token && config) {
    config.headers.Authorization = `Bearer ${user.token}`; // Add token to headers
  }
  return config; // Return modified config
});

// Response interceptor to handle responses and errors
API.interceptors.response.use(
  (response) => responseSuccessHandler(response), // Success handler
  (error) => responseErrorHandler(error) // Error handler
);

// Success handler for responses
const responseSuccessHandler = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`); // Log response details
  return response;
};

// Error handler for responses
const responseErrorHandler = (error: AxiosError) => {
  console.error(`[response error] [${JSON.stringify(error)}]`); // Log error details

  // If the error is a 401 Unauthorized and not from the auth endpoint
  if (!error.request.responseURL.includes("/api/auth") && error?.response?.status === 401) {
    const url = URL.LOGIN;
    clearStorage();
    return window.location.replace(url); // Redirect to login page
  }

  return Promise.reject(error);
};

export default API;
