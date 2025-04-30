import { useState } from "react";
import "./App.css";
import { formatBalance } from "./balances/balanceUtils";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useGetAddressBalances } from "./balances/hooks/useGetAddressBalances";

function App() {
  const [address, setAddress] = useState("");
  const { balances, error, isLoading, getBalances } = useGetAddressBalances();

  const handleSearch = async () => {
    if (!address) {
      return;
    }
    await getBalances(address);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Search for an</span>
            <span className="block text-blue-600">Ethereum Address</span>
          </h1>
          {error && (
            <div className="mt-8 max-w-xl mx-auto">
              <p className="text-red-500">{error}</p>
            </div>
          )}
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
