import {
  useEditionDrop,
  useClaimNFT,
  useNetworkMismatch,
  // ThirdwebSDKProviderProps,
} from "@thirdweb-dev/react";
import { VStack, Flex, Avatar, Button, Link, Text } from "@chakra-ui/react";
import { About } from "./Components/about";
import { Topbuttons } from "./Components/topbuttons";
// import { useAccount, useEnsName, useSigner } from "wagmi";
import { useAccount, useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { GiSailboat } from "react-icons/gi";

function App() {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState("");
  const isMismatched = useNetworkMismatch();
  const { data } = useEnsName({ address: address });
  const editionDrop = useEditionDrop(
    "0xF1cC36db8b8C48cCe1ebb41Ca8050dd0C36c0897"
  );
  const { mutate: claimNft, isLoading, error } = useClaimNFT(editionDrop);
  if (error) {
    console.error("failed to claim nft", error);
  }
  // const { data: signer } = useSigner();

  // useEffect(() => {
  //   if (signer) {
  //     void (async () => {
  //       const sdk = ThirdwebSDKProviderProps.fromSigner(signer);
  //       const nftDrop = sdk.getNFTDrop(editionDrop);
  //       claimNft(nftDrop);
  //     })();
  //   }
  // }, [signer]);

  useEffect(() => {
    setWalletAddress(data || (address as string));
    console.log({ walletAddress });
  }, [address]);

  return (
    <div>
      <Topbuttons />
      <Flex
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        minHeight="90vh"
      >
        <VStack p="8" width="100%">
          <About />
          <ConnectButton />
          {address ? (
            <>
              {!isMismatched && (
                <VStack>
                  <Button
                    colorScheme="purple"
                    disabled={isLoading}
                    onClick={() =>
                      claimNft({ to: address, tokenId: 0, quantity: 1 })
                    }
                    _hover={{ transform: "scale(1.1)" }}
                    size="lg"
                  >
                    Claim NFT!
                  </Button>
                  <Button
                    colorScheme="blue"
                    rightIcon={<GiSailboat />}
                    onClick={() =>
                      window.open(
                        "https://testnets.opensea.io/assets/rinkeby/0xf1cc36db8b8c48cce1ebb41ca8050dd0c36c0897/0",
                        "_blank"
                      )
                    }
                    _hover={{ transform: "scale(1.1)" }}
                  >
                    View on OpenSea
                  </Button>
                </VStack>
              )}
            </>
          ) : (
            <Text></Text>
          )}
          <Link href="https://joshcs.lol" pt="8" isExternal>
            <Avatar src="/favicon.svg" mx="auto" size="md" />
          </Link>
        </VStack>
      </Flex>
    </div>
  );
}

export default App;
