"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { anvil, sepolia } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "KipuBank V2",
  projectId: "53500db8a42087911ad5b7b5ef4cf056",
  chains: [anvil, sepolia],
  transports: { [anvil.id]: http("http://127.0.0.1:8545") },
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en-US">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
