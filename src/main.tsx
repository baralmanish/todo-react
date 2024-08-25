import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ConfigProvider } from "antd";

import { router } from "./router"; // Import the router configuration
import { antDesignThemeConfig } from "./configs"; // Import custom Ant Design theme configuration

import "./index.scss";

// Initialize the React application and render it into the root element
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* ConfigProvider from Ant Design for applying global theme settings */}
    <ConfigProvider theme={antDesignThemeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>
);
