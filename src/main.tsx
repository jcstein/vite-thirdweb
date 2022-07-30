import "./polyfills";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { ColorModeScript } from "@chakra-ui/react";
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const activeChainId = ChainId.Rinkeby;

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ChakraProvider theme={theme}>
        <ThirdwebProvider desiredChainId={activeChainId}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ThirdwebProvider>
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);
