import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Auth/register";

import { URL } from "./utils/constants";
import { PrivateOutlet } from "./PrivateOutlet";

// Define routes for pages within the application
const pages = [
  {
    path: URL.DASHBOARD,
    element: <Dashboard />
  }
];

// Create a browser router with routes configuration
export const router = createBrowserRouter([
  { path: URL.LOGIN, element: <Login /> },
  { path: URL.REGISTER, element: <Register /> },
  {
    path: "/", // Base path for private routes
    element: <PrivateOutlet />, // Component to handle private routes
    children: pages // Nested routes for private area
  },
  {
    path: "*", // Wildcard path for handling unknown routes
    lazy: async () => {
      const { NotFound } = await import("./pages/NotFound"); // Lazy load the NotFound component
      return { Component: NotFound }; // Return the NotFound component
    }
  }
]);
