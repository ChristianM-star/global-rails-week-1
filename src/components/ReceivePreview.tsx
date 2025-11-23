import { Link } from "react-router-dom";

export default function ReceivePreview() {
  return (
    <div className="flex items-center justify-center pt-20">
      <div className="bg-blue-400 p-6 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Receiver Preview
        </h1>

        <p className="text-amber-50 mb-4">
          This is where the receiver's details and payout preview will appear.
        </p>

        <Link
          to="/"
          className="block text-center mt-6 bg-white hover:bg-blue-200 transition p-3 rounded-lg font-medium text-blue"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
