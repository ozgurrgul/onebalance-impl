import { useState } from "react";
import { fetchBalances } from "../balances/balanceSideEffects";
import { Balances } from "../balances/balanceTypes";

// Ideally we should use react-query since it handles caching, error handling, etc.
export const useGetAddressBalances = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [balances, setBalances] = useState<Balances>();
  const [error, setError] = useState<string>();

  const reset = () => {
    setError(undefined);
    setIsLoading(true);
    setBalances(undefined);
  };

  const getBalances = async (address: string) => {
    if (!address) {
      return;
    }
    // Ideally we should use react-query since it handles caching, error handling, etc.
    try {
      reset();
      const balances = await fetchBalances(address);
      setBalances(balances);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { balances, error, isLoading, getBalances };
};
