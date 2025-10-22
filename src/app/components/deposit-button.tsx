"use client";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/constants";
import { useState } from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

export function DepositButton() {
  const { writeContract } = useWriteContract();
  const [amountToDeposit, setAmountToDeposit] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(",", "."); // normalize commas to dots
    value = value.replace(/[^0-9.]/g, ""); // only digits and dot
    const parts = value.split(".");
    if (parts.length > 2) value = parts[0] + "." + parts[1]; // only one dot
    if (parts[1]?.length > 8) value = parts[0] + "." + parts[1].slice(0, 8); // max 8 decimals
    setAmountToDeposit(value);
  };

  const deposit = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "deposit",
      value: parseEther(amountToDeposit), // e.g., deposit 0.1 ETH
    });
  };

  return (
    <InputGroup>
      <InputGroupInput
        inputMode="decimal"
        pattern="[0-9]*[.,]?[0-9]*"
        placeholder="0.05"
        value={amountToDeposit}
        onChange={handleChange}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          disabled={!amountToDeposit}
          onClick={deposit}
          variant="secondary"
          className="bg-indigo-900 text-white"
        >
          Deposit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
