import { ethers } from "ethers";

export const isValidAddress = (address: string) => {
  return ethers.isAddress(address);
};
