import { useState } from "react";
import type { Transaction } from "../types/Transaction";

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = JSON.parse(localStorage.getItem("transactions") || "[]");

    return stored
      .slice()
      .sort((a: Transaction, b: Transaction) => b.timestamp - a.timestamp);
  });

  const clearHistory = () => {
    localStorage.removeItem("transactions");
    setTransactions([]);
  };

  const formatZAR = (value: number) =>
    new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value);

  const formatUSD = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <div className="pt-20 flex justify-center">
      <div className="w-full max-w-md bg-gray-700 p-6 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Transaction History
        </h1>

        {transactions.length === 0 ? (
          <p className="text-gray-300 text-center">No transactions yet.</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-gray-800 p-4 rounded-lg border border-gray-600"
              >
                <p className="text-green-400 font-semibold">
                  {formatUSD(tx.usd)} → {formatZAR(tx.zar)}
                </p>
                <p className="text-gray-300 text-sm">
                  Rate: 1 USD = {tx.rate} ZAR
                </p>
                <p className="text-gray-400 text-xs">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Clear Button */}
        <button
          onClick={clearHistory}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white w-full p-3 rounded-lg font-medium"
        >
          Clear History
        </button>
      </div>
    </div>
  );
}
