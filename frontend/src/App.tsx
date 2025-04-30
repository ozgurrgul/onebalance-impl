import { useState } from "react";
import "./App.css";
import { fetchBalances } from "./balances/balanceSideEffects";
import { Balances } from "./balances/balanceTypes";
import { formatBalance } from "./balances/balanceUtils";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

function App() {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [balances, setBalances] = useState<Balances>();

  const handleSearch = async () => {
    if (!address) {
      return;
    }
    // Ideally we should use react-query since it handles caching, error handling, etc.
    try {
      setIsLoading(true);
      const balances = await fetchBalances(address);
      setBalances(balances);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Search for an</span>
            <span className="block text-blue-600">Ethereum Address</span>
          </h1>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="flex gap-2">
              <Input value={address} onChange={setAddress} />
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Loading..." : "Search"}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {balances?.map((balance) => (
              <div
                key={balance.symbol}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {balance.symbol}
                  </h2>
                </div>
                <p className="mt-4 text-xl font-bold text-gray-900">
                  {formatBalance(balance.balance)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
