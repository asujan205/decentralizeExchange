import { Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { nftAbi, nftAddress, tokenAbi, tokenAdd } from "../constant/abis";
import { useWeb3React } from "@web3-react/core";

export const removeLiquidity = async (signer: any, removeLPTokensWei: any) => {
  const exchangeContract = new Contract(nftAddress, nftAbi, signer);
  const tx = await exchangeContract.removeLiquidity(removeLPTokensWei);
  await tx.wait();
};

export const getTokensAfterRemove = async (
  provider: any,
  removeLPTokenWei: any,
  _ethBalance: any,
  cryptoDevTokenReserve: any
) => {
  try {
    const exchangeContract = new Contract(nftAddress, nftAbi, provider);

    const _totalSupply = await exchangeContract.totalSupply();

    const _removeEther = _ethBalance.mul(removeLPTokenWei).div(_totalSupply);
    const _removeCD = cryptoDevTokenReserve
      .mul(removeLPTokenWei)
      .div(_totalSupply);
    return {
      _removeEther,
      _removeCD,
    };
  } catch (err) {
    console.error(err);
  }
};
