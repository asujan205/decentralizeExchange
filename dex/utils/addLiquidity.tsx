import { Contract, BigNumberish } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { nftAbi, nftAddress, tokenAbi, tokenAdd } from "../constant/abis";

import { useState, useMemo } from "react";

import { useWeb3React } from "@web3-react/core";
import { use } from "chai";

const addLiquidity = async (
  ethBalance: BigNumberish,
  tokenBalance: BigNumberish
) => {
  const { account, library } = useWeb3React();

  const signer = useMemo(() => library?.getSigner(), [library]);

  const nftContract = new Contract(nftAddress, nftAbi, signer);
  const tokenContract = new Contract(tokenAdd, tokenAbi, signer);
  const approve = await tokenContract.approve(nftAddress, tokenBalance);
  await approve.wait();

  const addLiquidity = await nftContract.addLiquidity(tokenBalance, {
    value: parseEther(ethBalance.toString()),
  });
};
