import Header from "@/components/header";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/constants";
import { useReadContract } from "wagmi";
import { BankCap } from "./components/bank-cap";
import Balance from "./components/balance";
import { DepositButton } from "./components/deposit-button";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-start gap-2">
          <div className="text-4xl font-bold">Welcome to KipuBank V2</div>
          <BankCap />
          <Balance />
          <DepositButton />
        </div>
      </div>
    </main>
  );
}
