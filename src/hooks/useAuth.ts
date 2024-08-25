import { getFromStorage } from "../utils/helpers";
import { DEFAULT_USER_AUTH_KEY } from "../utils/constants";
import { IUserStore } from "../interfaces/auth";

const useAuth = () => {
  // Retrieve the user data from storage
  const user = getFromStorage(DEFAULT_USER_AUTH_KEY);

  // If user data exists, parse it and check for a valid token
  if (user) {
    const auth: IUserStore = JSON.parse(user);
    if (auth.token) {
      return auth; // Return user authentication data if token is present
    }
  }

  // Return null if no valid user data is found
  return null;
};

export default useAuth;
