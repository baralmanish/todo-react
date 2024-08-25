import { Provider } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import { store } from "./redux/store";
import { URL } from "./utils/constants";
import AppLayout from "./components/Layout";
import { ILocation } from "./interfaces/common";

// Component to handle private routes and authentication
export const PrivateOutlet = () => {
  // Get the current user authentication status
  const currentUser = useAuth();
  const location: ILocation = useLocation();

  // Redirect to login if the user is not authenticated
  if (!currentUser) {
    return <Navigate to={URL.LOGIN} state={JSON.stringify({ from: location.pathname })} replace />;
  }

  // If authenticated, render the application layout and nested routes
  return (
    <Provider store={store}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </Provider>
  );
};
