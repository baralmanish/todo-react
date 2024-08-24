import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import { URL } from "./utils/constants";
import { ILocation } from "./interfaces/common";

export const PrivateOutlet = () => {
  const currentUser = useAuth();
  const location: ILocation = useLocation();

  if (!currentUser) {
    return <Navigate to={URL.LOGIN} state={JSON.stringify({ from: location.pathname })} replace />;
  }

  return <Outlet />;
};
