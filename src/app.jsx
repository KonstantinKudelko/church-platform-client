import { Router } from "./router";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ToastContainer />
    </QueryClientProvider>
  );
}
