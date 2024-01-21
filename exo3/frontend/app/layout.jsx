"use client";

import { ChakraProvider } from "@chakra-ui/react";

// Importing rainbowkit for connecting wallet from different sources ...
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Voting contract app",
  projectId: "c032f59f0382ce7c0bf4981a9d8b7737", // Id set on wallet connect
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ChakraProvider>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
          </WagmiConfig>
        </ChakraProvider>
      </body>
    </html>
  );
}
