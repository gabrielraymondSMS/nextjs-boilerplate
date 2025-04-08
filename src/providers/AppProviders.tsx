"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const devtools = process.env.NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS;

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devtools === "true" && <ReactQueryDevtools initialIsOpen={true} />}
    </QueryClientProvider>
  );
};
