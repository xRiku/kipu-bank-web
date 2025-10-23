"use client";
import { useBank } from "@/lib/bank-context";

export default function Balance() {
  const { userBalance } = useBank();

  if (!userBalance) return null;

  return (
    <p className="text-sm text-gray-300 mb-6">
      Deposited amount{" "}
      <span className="font-semibold text-white">
        {Number(userBalance).toFixed(3)} ETH
      </span>
    </p>
  );
}
