import { getFromStorage } from "../utils/helpers";
import { DEFAULT_USER_AUTH_KEY } from "../utils/constants";
import { IUser } from "../interfaces/auth";

const useAuth = () => {
  const user = getFromStorage(DEFAULT_USER_AUTH_KEY);
  if (user) {
    const auth: IUser = JSON.parse(user);
    if (auth.token) {
      return auth;
    }
  }
  return null;
};

export default useAuth;
