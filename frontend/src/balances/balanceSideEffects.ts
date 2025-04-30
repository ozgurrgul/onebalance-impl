import { Balances } from "./balanceTypes";

// TODO should be moved to .env
const BASE_API_URL = "http://localhost:3000";

export const fetchBalances = async (address: string): Promise<Balances> => {
  const response = await fetch(
    `${BASE_API_URL}/api/balance?address=${address}`
  );
  const data = await response.json();
  return data.balances;
};
