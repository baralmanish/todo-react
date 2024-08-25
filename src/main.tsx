import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ConfigProvider } from "antd";

import { router } from "./router";
import { antDesignThemeConfig } from "./configs";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={antDesignThemeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>
);
