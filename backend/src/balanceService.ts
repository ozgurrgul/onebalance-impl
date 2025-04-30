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
  const supportedSymbols = ["ETH", ...Object.keys(TOKEN_CONTRACTS)];
  const balancePromises = supportedSymbols.map(async (symbol) => {
    try {
      return await getBalanceFromSymbol(address, symbol as SupportedSymbol);
    } catch (error) {
      console.error(
        `Error fetching balance for ${address} on ${symbol}:`,
        error
      );
      return null;
    }
  });

  const balances = await Promise.all(balancePromises);
  const validBalances = balances
    .filter(
      (balance): balance is Awaited<ReturnType<typeof getBalanceFromSymbol>> =>
        balance !== null && balance.balance !== undefined
    )
    .map(({ symbol, balance }) => ({
      symbol,
      balance: ethers.formatUnits(balance, DECIMALS[symbol]),
    }));

  if (validBalances.length === 0) {
    throw new Error("No valid balances found for the given address");
  }

  return validBalances;
};
