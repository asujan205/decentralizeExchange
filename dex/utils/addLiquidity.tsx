import { Contract, BigNumberish } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { nftAbi, nftAddress, tokenAbi, tokenAdd } from "../constant/abis";

import { useState } from "react";

import { useWeb3React } from "@web3-react/core";

const addLiquidity = () => {
  const { provider, account } = useWeb3React();
  const [ethBalance, setEthBalance] = useState<BigNumberish>(0);
  const [tokenBalance, setTokenBalance] = useState<BigNumberish>(0);
  const signer = provider?.getSigner();
};
