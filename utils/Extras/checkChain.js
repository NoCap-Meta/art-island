// Function to check and change the chain

const mumbaiPolygonTestnet = {
  chainId: '0x13881', // Chain ID for Mumbai testnet
  rpcUrl: 'https://rpc-mumbai.maticvigil.com',
};

export const changeToMumbaiPolygonTestnet = async () => {
  const provider = window.ethereum;

  if (!provider) {
    console.error("MetaMask or compatible wallet not found.");
    return;
  }

  const currentChainId = await provider.request({ method: 'eth_chainId' });

  if (currentChainId !== mumbaiPolygonTestnet.chainId) {
    try {
      //check if chain is added
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: mumbaiPolygonTestnet.chainId,
          chainName: 'Mumbai Polygon Testnet',
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18

          },
          rpcUrls: [mumbaiPolygonTestnet.rpcUrl],
          blockExplorerUrls: ['https://mumbai.polygonscan.com/'],

        }],
      });

      //switch to chain
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: mumbaiPolygonTestnet.chainId }],
      });

    } catch (error) {
      console.error("Failed to switch to Mumbai Polygon Testnet:", error);
    }
  } else {
    console.log("Already on Mumbai Polygon Testnet");
  }
}