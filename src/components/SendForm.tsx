import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SendForm() {
  // store input as string
  const [amountUSD, setAmountUSD] = useState<string>("");
  const [rate, setRate] = useState<number>(0);

  // fetch USD → ZAR rate once on load
 useEffect(() => {
  async function fetchRate() {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await res.json();
      setRate(data.rates?.ZAR || 0);
    } catch (err) {
      console.error(err);
      setRate(0);
    }
  }

  fetchRate();
}, []);


  // convert ONLY when calculating
  const amountNumber = parseFloat(amountUSD || "0");
  const converted = rate ? amountNumber * rate : 0;

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="bg-gray-600 p-6 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Send Money (USA → South Africa)
        </h1>

        <label htmlFor="usd-amount" className="text-sm mb-2 text-amber-50 block">
          Amount in USD
        </label>

        <input
          id="usd-amount"
          type="text"
          placeholder="0.00"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          value={amountUSD}
          onChange={(e) => setAmountUSD(e.target.value)}
        />

        <p className="mt-4 text-gray-300">
          Rate:{" "}
          <span className="font-semibold">
            {rate ? `1 USD = ${rate.toFixed(4)} ZAR` : "Loading..."}
          </span>
        </p>

        <p className="mt-4 text-gray-300">You will receive approximately:</p>

        <p className="text-xl font-semibold text-green-400">
          R {converted.toFixed(2)}
        </p>

        <Link
          to="/receive"
          className="block text-center mt-6 bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-medium text-white"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
