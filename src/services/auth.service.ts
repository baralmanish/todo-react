import API from "./axios";
import { ILoginForm } from "../interfaces/auth";
import { DEFAULT_USER_AUTH_KEY } from "../utils/constants";
import { clearStorage, setInStorage } from "../utils/helpers";

const API_URL = "/api/auth";

class AuthService {
  login(values: ILoginForm) {
    return API.post(`${API_URL}/login`, values)
      .then((response) => {
        if (response.data.token) {
          setInStorage(DEFAULT_USER_AUTH_KEY, JSON.stringify(response.data));
        }
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
