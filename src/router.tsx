import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Auth/register";

import { URL } from "./utils/constants";
import { PrivateOutlet } from "./PrivateOutlet";

const pages = [
  {
    path: URL.DASHBOARD,
    element: <Dashboard />
  }
];

export const router = createBrowserRouter([
  { path: URL.LOGIN, element: <Login /> },
  { path: URL.REGISTER, element: <Register /> },
  {
    path: "/",
    element: <PrivateOutlet />,
    children: pages
  },
  {
    path: "*",
    lazy: async () => {
      const { NotFound } = await import("./pages/NotFound");
      return { Component: NotFound };
    }
  }
]);
