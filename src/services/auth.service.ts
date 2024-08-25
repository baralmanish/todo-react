import API from "./axios";
import { DEFAULT_USER_AUTH_KEY } from "../utils/constants";
import { ILoginForm, IRegisterForm, IUserStore } from "../interfaces/auth";
import { clearStorage, getFromStorage, setInStorage } from "../utils/helpers";

const API_URL = "/api/auth";

class AuthService {
  // Method to handle user login
  login(values: ILoginForm) {
    return API.post(`${API_URL}/login`, values)
      .then((response) => {
        // If login is successful and a token is received
        if (response.data.token) {
          // Store username and token in storage
          setInStorage(
            DEFAULT_USER_AUTH_KEY,
            JSON.stringify({
              username: values.username,
              token: response.data.token
            })
          );
        }
        return response; // Return the response
      })
      .catch((error) => {
        return error.response; // Return error response in case of failure
      });
  }

  // Method to handle user registration
  register(values: IRegisterForm) {
    return API.post(`${API_URL}/register`, values)
      .then((response) => {
        return response; // Return the response
      })
      .catch((error) => {
        return error.response; // Return error response in case of failure
      });
  }

  // Method to get the currently authenticated user
  getUser() {
    const localUser = getFromStorage(DEFAULT_USER_AUTH_KEY); // Retrieve user data from storage
    if (!localUser) {
      return null; // Return null if no user data is found
    }

    return JSON.parse(localUser) as IUserStore; // Parse and return user data
  }

  // Method to handle user logout
  logout() {
    clearStorage();
  }
}

export default new AuthService();
