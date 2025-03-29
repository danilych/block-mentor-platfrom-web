import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface TokenInfo {
  name: string;
  symbol: string;
  balance: string;
  availableToClaim: string;
  availableToLock: string;
}

const VestingPage = () => {
  const { tokenAddress } = useParams<{ tokenAddress: string }>();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!tokenAddress) return;

      setIsLoading(true);
      try {
        // TODO: Replace with actual web3 calls
        setTokenInfo(null);
      } catch (error) {
        console.error("Error fetching token info:", error);
        setError("Failed to load token information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenInfo();
  }, [tokenAddress]);

  const handleClaim = async () => {
    if (!tokenAddress) return;

    try {
      // TODO: Implement actual claiming logic
      console.log("Claim functionality not yet implemented");
    } catch (error) {
      console.error("Error claiming tokens:", error);
      setError("Failed to claim tokens");
    }
  };

  const handleLock = async () => {
    if (!tokenAddress) return;

    try {
      // TODO: Implement actual locking logic
      console.log("Lock functionality not yet implemented");
    } catch (error) {
      console.error("Error locking tokens:", error);
      setError("Failed to lock tokens");
    }
  };

  return (
    <div className="min-h-screen text-black relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8">Token Vesting</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
          </div>
        ) : tokenInfo ? (
          <div className="bg-gray-50 shadow-lg border border-gray-100 rounded-lg p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-500">Token Name</label>
                <div className="text-xl font-semibold text-gray-900">
                  {tokenInfo.name}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-500">Token Symbol</label>
                <div className="text-xl font-semibold text-gray-900">
                  {tokenInfo.symbol}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-500">Token Balance</label>
              <div className="text-2xl font-bold text-gray-900">
                {tokenInfo.balance} {tokenInfo.symbol}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <label className="text-gray-500 block mb-2">
                  Available to Claim
                </label>
                <div className="text-xl font-semibold text-emerald-600">
                  {tokenInfo.availableToClaim} {tokenInfo.symbol}
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <label className="text-gray-500 block mb-2">
                  Available to Lock
                </label>
                <div className="text-xl font-semibold text-indigo-600">
                  {tokenInfo.availableToLock} {tokenInfo.symbol}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleClaim}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Claim Tokens
              </button>
              <button
                onClick={handleLock}
                className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Lock Tokens
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No Token Information Available
            </h3>
            <p className="text-gray-500 mb-6">
              {tokenAddress 
                ? `No vesting information found for token address: ${tokenAddress}`
                : "Please provide a token address to view vesting details"}
            </p>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VestingPage;
