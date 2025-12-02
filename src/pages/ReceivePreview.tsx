import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ReceivePreview() {
  const location = useLocation();
  //? get the state object or any empty object if no state was passed
  const { usd, zar, rate, timestamp } = location.state || {};
  const navigate = useNavigate();

  //!  Redirecting if user came here without data
  useEffect(() => {
    if (usd === undefined || zar === undefined || rate === undefined) {
      navigate("/");
    }
  }, [navigate, usd, zar, rate]);

  // ? Format USD
  const formatUSD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);

  //?  Format ZAR
  const formatZAR = (value: number) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="bg-blue-400 p-6 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Receiver Preview
        </h1>

        <div className="text-white bg-blue-950 p-3 rounded-xl text-center">
          <p className="mb-3">Amount Sent: {formatUSD(usd)}</p>
          <p className="mb-3">Amount Received: {formatZAR(zar)}</p>
          <p className="mb-3">Rate Used: 1 USD = {rate} ZAR</p>
          <p className="p-2" >
            Time: {timestamp? new Date(timestamp).toLocaleString(): "N/A"}
          </p>
        </div>

        <button
          
          onClick={() => navigate(-1)}
          className="block text-center mt-6 w-2xs bg-white hover:bg-blue-200 transition p-3 rounded-lg font-medium text-blue"
        >
          Back
        </button>
      </div>
    </div>
  );
}
