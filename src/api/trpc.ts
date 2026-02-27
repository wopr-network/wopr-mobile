import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { API_BASE_URL } from "../lib/constants";
import type { BotInstance } from "../types/bot";

// Minimal type stub for fleet.listInstances
// Replace with shared types package import when available
interface AppRouter {
  fleet: {
    listInstances: {
      query: () => Promise<{ bots: BotInstance[] }>;
    };
  };
}

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${API_BASE_URL}/trpc`,
      fetch: (url, options) =>
        fetch(url as string, {
          ...(options as RequestInit),
          credentials: "include",
        }),
      transformer: superjson,
    }),
  ],
});
