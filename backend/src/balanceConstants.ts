import { SupportedToken } from "./balanceTypes";

export type address = string;

export const DECIMALS = {
  ETH: 18,
  USDC: 6,
  LINK: 18,
} as const;

export const TOKEN_CONTRACTS: Record<SupportedToken, string> = {
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
} as const;

// ERC20 ABI for balanceOf function
export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];
