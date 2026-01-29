// components/TanStackProvider/TanStackProvider.tsx

"use client";

// React components
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Types
interface TanStackProviderProps {
  children: React.ReactNode;
}

export default function TanStackProvider({ children }: TanStackProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}



