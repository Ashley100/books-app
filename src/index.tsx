import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import "./index.css";
import { RootLoadingState } from "./components/RootLoadingState";
import { routeTree } from "./routes";

const router = createRouter({
  routeTree,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return <RouterProvider router={router} />;
}

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<RootLoadingState />}>
        <App />
      </Suspense>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);
