"use client";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/constants";
import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import { Spinner } from "@/components/ui/spinner";

export function BankCap() {
  const { data: bankCap, isLoading: isLoadingBankCapacity } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "bankCapacity",
  });

  const { data: bankBalance, isLoading: isLoadingBankBalance } =
    useReadContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "getBankBalance",
    });

  if (isLoadingBankCapacity || !bankCap || isLoadingBankBalance)
    return (
      <span className="text-2xl font-bold flex items-center gap-2">
        <Spinner />
        <p>Loading contract balance...</p>
      </span>
    );

  return (
    <div className="text-2xl font-bold flex items-center gap-2">
      Bank Capacity:{" "}
      <p>
        {formatEther(bankBalance as bigint)}/{formatEther(bankCap as bigint)}{" "}
        ETH
      </p>
    </div>
  );
}
