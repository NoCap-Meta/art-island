

const SIGNING_DOMAIN_NAME = "NoCap_MarketItem";
const SIGNING_DOMAIN_VERSION = "1";
import { web3, ethersProvider } from "@/pages/_app";


class NoCapVoucher {
  constructor(data) {
    const { _contract } = data;
    this.contract = _contract;
  }

  async _signingDomain() {
    if (this._domain != null) {
      return this._domain;
    }
    const chainId = 80001;
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contract._address,
      chainId,
    };
    return this._domain;
  }


  async createVoucher(seller, NFTAddress, tokenId, maxFractions, fractions, pricePerFraction, toMint, royaltyKeeper, royaltyFees, tokenURI) {
    const voucher = {
      seller,
      NFTAddress,
      tokenId,
      maxFractions,
      fractions,
      pricePerFraction,
      toMint,
      royaltyKeeper,
      royaltyFees,
      tokenURI
    };
    console.log(voucher)
    const domain = await this._signingDomain();
    const types = {
      NFTVoucher: [
        { name: "seller", type: "address" },
        { name: "NFTAddress", type: "address" },
        { name: "tokenId", type: "uint256" },
        { name: "maxFractions", type: "uint256" },
        { name: "fractions", type: "uint256" },
        { name: "pricePerFraction", type: "uint256" },
        { name: "toMint", type: "bool" },
        { name: "royaltyKeeper", type: "address" },
        { name: "royaltyFees", type: "uint96" },
        { name: "tokenURI", type: "string" },
      ],

    };

    //signTypedData with ethersProvider
    const singer = await ethersProvider.getSigner();
    const signature = await singer._signTypedData(domain, types, voucher);


    return {
      ...voucher,
      signature,
    };
  }
}

export { NoCapVoucher }
