import { QueryClient } from "@tanstack/react-query";

export const reactQueryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: 1000,
      staleTime: 0
    }
  }
});
