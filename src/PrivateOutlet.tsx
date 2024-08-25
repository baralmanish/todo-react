import { Provider } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import { store } from "./redux/store";
import { URL } from "./utils/constants";
import AppLayout from "./components/Layout";
import { ILocation } from "./interfaces/common";

export const PrivateOutlet = () => {
  const currentUser = useAuth();
  const location: ILocation = useLocation();

  if (!currentUser) {
    return <Navigate to={URL.LOGIN} state={JSON.stringify({ from: location.pathname })} replace />;
  }

  return (
    <Provider store={store}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </Provider>
  );
};
