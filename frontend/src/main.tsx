import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import Toast from "./components/Toast.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Example default option
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toast />
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
