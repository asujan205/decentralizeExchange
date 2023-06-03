import { Contract } from "ethers";

import { nftAbi, nftAddress, tokenAbi, tokenAdd } from "../constant/abis";

export const getAmountOfTokensReceivedFromSwap = async (
  _swapAmountWei: any,
  provider: any,
  ethSelected: any,
  ethBalance: any,
  reservedCD: any
) => {
  const exchangeContract = new Contract(nftAddress, nftAbi, provider);
  let amountOfTokens;

  if (ethSelected) {
    amountOfTokens = await exchangeContract.getAmountoftoken(
      _swapAmountWei,
      ethBalance,
      reservedCD
    );
  } else {
    amountOfTokens = await exchangeContract.getAmountoftoken(
      _swapAmountWei,
      reservedCD,
      ethBalance
    );
  }

  return amountOfTokens;
};

export const swapTokens = async (
  signer: any,
  swapAmountWei: any,
  tokenToBeReceivedAfterSwap: any,
  ethSelected: any
) => {
  const exchangeContract = new Contract(nftAddress, nftAbi, signer);
  const tokenContract = new Contract(tokenAdd, tokenAbi, signer);
  let tx;

  if (ethSelected) {
    tx = await exchangeContract.ethToToken(tokenToBeReceivedAfterSwap, {
      value: swapAmountWei,
    });
  } else {
    tx = await tokenContract.approve(nftAddress, swapAmountWei.toString());
    await tx.wait();

    tx = await exchangeContract.tokenToEth(
      swapAmountWei,
      tokenToBeReceivedAfterSwap
    );
  }
  await tx.wait();
};
