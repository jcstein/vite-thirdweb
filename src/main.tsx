import "./polyfills";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { ColorModeScript } from "@chakra-ui/react";

const activeChainId = ChainId.Goerli;

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ThirdwebProvider>
    </ChakraProvider>
  </React.StrictMode>
);
