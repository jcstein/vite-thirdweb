import {
  useAddress,
  useDisconnect,
  useMetamask,
  useWalletConnect,
  useEditionDrop,
  useClaimNFT,
} from "@thirdweb-dev/react";
import { VStack, Flex, Avatar, Button, Link } from "@chakra-ui/react";
import { About } from "./Components/about";
import { Topbuttons } from "./Components/topbuttons";

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const editionDrop = useEditionDrop(
    "0x4BC4084f6060E106676f30Eb4731Cb77bd59A3f8"
  );
  const { mutate: claimNft, isLoading, error } = useClaimNFT(editionDrop);

  if (error) {
    console.error("failed to claim nft", error);
  }
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
          {address ? (
            <>
              <Button onClick={disconnectWallet} colorScheme="purple">
                Disconnect Wallet
              </Button>
              <p>Your address: {address}</p>
              <Button
                colorScheme="purple"
                disabled={isLoading}
                onClick={() =>
                  claimNft({ to: address, tokenId: 0, quantity: 1 })
                }
              >
                Claim NFT!
              </Button>
              <Link
                href="https://testnets.opensea.io/collection/jcs-edition"
                isExternal
              >
                View this collection on OpenSea
              </Link>
            </>
          ) : (
            <VStack>
              <Button onClick={connectWithMetamask} colorScheme="purple">
                Connect with Metamask
              </Button>
              <Button onClick={connectWithWalletConnect} colorScheme="purple">
                Connect WalletConnect
              </Button>
            </VStack>
          )}
          <Link href="https://joshcs.lol" pt="8" isExternal>
            <Avatar src="/jcs.png" mx="auto" size="md" />
          </Link>
        </VStack>
      </Flex>
    </div>
  );
}

export default App;
