import io from "socket.io-client";
import { Router } from "./router";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

export const socket = io(import.meta.env.VITE_SOCKET_URL);

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router />
        <ToastContainer />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
