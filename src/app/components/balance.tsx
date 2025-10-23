"use client";

import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";

export default function Balance() {
  const { address } = useAccount();

  const { data, isLoading } = useBalance({
    address,
  });

  if (isLoading || !data) {
    return <></>;
  }

  return (
    <div className="flex flex-col">
      <p className="text-sm text-gray-300 mb-6">
        Your balance{" "}
        <span className="font-semibold text-white">
          {Number(formatEther(data?.value as bigint)).toFixed(6)}
          {data?.symbol}
        </span>
      </p>
    </div>
  );
}
