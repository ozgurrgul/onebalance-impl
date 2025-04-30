import { ethers } from "ethers";
import { DECIMALS, ERC20_ABI, TOKEN_CONTRACTS } from "./balanceConstants";
import { SupportedSymbol, SupportedToken } from "./balanceTypes";

// TODO should be from from .env
const ETH_RPC_URL = "https://eth-mainnet.public.blastapi.io";
const provider = new ethers.JsonRpcProvider(ETH_RPC_URL);

export const isValidAddress = (address: string) => {
  return ethers.isAddress(address);
};

const getEthBalance = async (address: string) => {
  const balance = await provider.getBalance(address);
  return balance;
};

const getTokenBalance = async (address: string, symbol: SupportedToken) => {
  const tokenAddress = TOKEN_CONTRACTS[symbol];
  if (!tokenAddress) {
    return;
  }
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  return await contract.balanceOf(address);
};

const getBalanceFromSymbol = async (
  address: string,
  symbol: SupportedSymbol
): Promise<{ symbol: SupportedSymbol; balance: bigint }> => {
  if (symbol === "ETH") {
    return {
      symbol: symbol,
      balance: await getEthBalance(address),
    };
  }

  return {
    symbol: symbol,
    balance: await getTokenBalance(address, symbol),
  };
};

export const getBalances = async (address: string) => {
  const supportedsymbols = ["ETH", ...Object.keys(TOKEN_CONTRACTS)];
  const balances = await Promise.all(
    supportedsymbols.map(async (symbol) =>
      getBalanceFromSymbol(address, symbol as SupportedSymbol)
    )
  );

  return balances
    .filter((balance) => !!balance)
    .map(({ symbol, balance }) => {
      return {
        symbol,
        balance: ethers.formatUnits(balance, DECIMALS[symbol]),
      };
    });
};
