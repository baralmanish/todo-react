import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";
import { antDesignThemeConfig, reactQueryClientConfig } from "./configs";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={antDesignThemeConfig}>
      <QueryClientProvider client={reactQueryClientConfig}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);
