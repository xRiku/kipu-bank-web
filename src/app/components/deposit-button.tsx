"use client";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useBank } from "@/lib/bank-context";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/constants";
import { config } from "@/providers";
import { useState } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function DepositButton() {
  const { writeContractAsync } = useWriteContract();
  const [amountToDeposit, setAmountToDeposit] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const { refetchAll } = useBank();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(",", "."); // normalize commas to dots
    value = value.replace(/[^0-9.]/g, ""); // only digits and dot
    const parts = value.split(".");
    if (parts.length > 2) value = parts[0] + "." + parts[1]; // only one dot
    if (parts[1]?.length > 8) value = parts[0] + "." + parts[1].slice(0, 8); // max 8 decimals
    setAmountToDeposit(value);
    setTxHash(undefined);
  };

  const deposit = async () => {
    try {
      setLoading(true);
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "deposit",
        value: parseEther(amountToDeposit),
      });

      setTxHash(txHash);
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  if (isSuccess) {
    toast.success("Deposit confirmed!");
    refetchAll();
  }

  if (isError) toast.error("Transaction failed on-chain.");

  return (
    <InputGroup>
      <InputGroupInput
        inputMode="decimal"
        placeholder="0.05"
        value={amountToDeposit}
        onChange={handleChange}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          disabled={!amountToDeposit || isLoading || loading}
          onClick={deposit}
          variant="secondary"
          className="bg-indigo-900 text-white flex items-center gap-2"
        >
          {(isLoading || loading) && <Spinner />}
          Deposit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
