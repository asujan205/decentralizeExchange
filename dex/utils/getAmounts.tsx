import { Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { nftAbi, nftAddress, tokenAbi, tokenAdd } from "../constant/abis";
import { useWeb3React } from "@web3-react/core";
export const getEtherBalance = async (
  provider: any,
  address: any,
  contract = false
) => {
  try {
    if (contract) {
      const balance = await provider.getBalance(nftAddress);
      return balance;
    } else {
      const balance = await provider.getBalance(address);
      return balance;
    }
  } catch (err) {
    console.error(err);
    return 0;
  }
};
