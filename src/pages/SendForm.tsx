import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SendForm() {
  // Store raw string exactly as the user types
  const [amountUSD, setAmountUSD] = useState<string>("");
  const [rate, setRate] = useState<number>(0);

  // Input cleaner 
  const cleanInput = (value: string) => {
    return value
      .replace(/[^0-9.]/g, "") // allow only digits + dot
      .replace(/(\..*)\./g, "$1") // prevent multiple dots
      .replace(/^0+(?=\d)/, ""); // prevent leading zeros
  };

  const isValidInput = /^(?!0\d)(\d{1,15})(\.\d{1,2})?$/.test(amountUSD);
   const isPositive = parseFloat(amountUSD) > 0;
   const isValid = isValidInput && isPositive;

  // Currency formatter (ZAR)
  const formatZAR = (value: number) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR", 
      maximumFractionDigits: 2,
    }).format(value);

  // Fetch USD → ZAR once
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

  // Safe conversion
  const amountNumber = parseFloat(amountUSD || "0");
  const converted = isValid && rate ? amountNumber * rate : 0;

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="bg-gray-600 p-6 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Send Money (USA → South Africa)
        </h1>

        <label
          htmlFor="usd-amount"
          className="text-sm mb-2 text-amber-50 block"
        >
          Amount in USD
        </label>

        <input
          id="usd-amount"
          type="text"
          placeholder="$ 0.00"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          value={amountUSD}
          onChange={(e) => setAmountUSD(cleanInput(e.target.value))}
        />

        {!isValid && amountUSD && (
          <p className="text-red-400 text-sm mt-2">
            Enter a valid amount (max 15 digits, 2 decimals)
          </p>
        )}

        <p className="mt-4 text-gray-300">
          Rate:{" "}
          <span className="font-semibold">
            {rate ? `1 USD = ${rate.toFixed(4)} ZAR` : "Loading..."}
          </span>
        </p>

        <p className="mt-4 text-gray-300">You will receive approximately:</p>

        <p className="text-xl font-semibold text-green-400">
          {formatZAR(converted)}
        </p>

        <button
          disabled={!isValid}
          onClick={() => {

            if(!isValid) return;

            //?1, this is the transaction object 
            const newTransaction = {
              id: crypto.randomUUID(),
              usd:amountNumber,
              zar: converted,
              rate: rate,
              timestamp: Date.now(),
            }

            //? Load old transactions 
            const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
            //? Add new one 
            const updated = [...existing, newTransaction];
            //? save them back
            localStorage.setItem("transactions", JSON.stringify(updated));

            //? Navigate with state 
            navigate("/receive", {
              state: {
                usd: amountNumber,
                zar: converted,
                rate: rate,
                timestamp: newTransaction.timestamp,
              },
            });
          }}
          className={`block text-center mt-6 w-3xs p-3 rounded-lg font-medium transition text-white
            ${
              isValid
                ? "bg-blue-600 cursor-pointer hover:bg-blue-700"
                : "bg-gray-500 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>
            <Link to="/history" className="text-blue-300 underline">
  View History
</Link>
      </div>
    </div>
  );
}
