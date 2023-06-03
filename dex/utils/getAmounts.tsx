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

export const getCDTokensBalance = async (provider: any, address: any) => {
  try {
    const tokenContract = new Contract(tokenAdd, tokenAbi, provider);
    const balanceOfCryptoDevTokens = await tokenContract.balanceOf(address);
    return balanceOfCryptoDevTokens;
  } catch (err) {
    console.error(err);
  }
};

export const getLPTokensBalance = async (provider: any, address: any) => {
  try {
    const exchangeContract = new Contract(nftAddress, nftAbi, provider);
    const balanceOfLPTokens = await exchangeContract.balanceOf(address);
    return balanceOfLPTokens;
  } catch (err) {
    console.error(err);
  }
};
export const getReserveOfCDTokens = async (provider: any) => {
  try {
    const exchangeContract = new Contract(nftAddress, nftAbi, provider);
    const reserve = await exchangeContract.getReserve();
    return reserve;
  } catch (err) {
    console.error(err);
  }
};
