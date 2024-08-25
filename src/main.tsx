import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { router } from "./router";
import { antDesignThemeConfig, reactQueryClientConfig } from "./configs";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={antDesignThemeConfig}>
      <QueryClientProvider client={reactQueryClientConfig}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);
