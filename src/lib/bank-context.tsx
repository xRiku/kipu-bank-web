"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/constants";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";

type BankContextType = {
  bankBalance?: string;
  bankCap?: string;
  userBalance?: string;
  refetchAll: () => void;
};

const BankContext = createContext<BankContextType>({
  refetchAll: () => {},
});

export function BankProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();

  const { data: _bankBalance, refetch: refetchBankBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getBankBalance",
  });

  const { data: _bankCap, refetch: refetchBankCap } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getBankCap",
  });

  const { data: _userBalance, refetch: refetchUserBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getUserBalance",
    args: [address],
  });

  const [bankBalance, setBankBalance] = useState<string>();
  const [bankCap, setBankCap] = useState<string>();
  const [userBalance, setUserBalance] = useState<string>();

  useEffect(() => {
    if (_bankBalance) setBankBalance(formatEther(_bankBalance as bigint));
    if (_bankCap) setBankCap(formatEther(_bankCap as bigint));
    if (_userBalance) setUserBalance(formatEther(_userBalance as bigint));
  }, [_bankBalance, _bankCap, _userBalance]);

  const refetchAll = async () => {
    await Promise.all([
      refetchBankBalance(),
      refetchBankCap(),
      refetchUserBalance(),
    ]);
  };

  return (
    <BankContext.Provider
      value={{
        bankBalance,
        bankCap,
        userBalance,
        refetchAll,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  return useContext(BankContext);
}
