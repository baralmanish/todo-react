import API from "./axios";
import { DEFAULT_USER_AUTH_KEY } from "../utils/constants";
import { ILoginForm, IRegisterForm, IUserStore } from "../interfaces/auth";
import { clearStorage, getFromStorage, setInStorage } from "../utils/helpers";

const API_URL = "/api/auth";

class AuthService {
  login(values: ILoginForm) {
    return API.post(`${API_URL}/login`, values)
      .then((response) => {
        if (response.data.token) {
          setInStorage(
            DEFAULT_USER_AUTH_KEY,
            JSON.stringify({
              username: values.username,
              token: response.data.token
            })
          );
        }
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  register(values: IRegisterForm) {
    return API.post(`${API_URL}/register`, values)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  getUser() {
    const localUser = getFromStorage(DEFAULT_USER_AUTH_KEY);
    if (!localUser) {
      return null;
    }

    return JSON.parse(localUser) as IUserStore;
  }

  logout() {
    clearStorage();
  }
}

export default new AuthService();
