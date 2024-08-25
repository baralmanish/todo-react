import API from "./axios";
import { DEFAULT_USER_AUTH_KEY } from "../utils/constants";
import { clearStorage, setInStorage } from "../utils/helpers";
import { ILoginForm, IRegisterForm } from "../interfaces/auth";

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

  logout() {
    clearStorage();
  }
}

export default new AuthService();
