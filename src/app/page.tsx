import Header from "@/components/header";
import { BankCap } from "./components/bank-cap";
import Balance from "./components/balance";
import { DepositButton } from "./components/deposit-button";
import { Particles } from "@/components/ui/particles";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Header />
      <div className="flex flex-col items-center h-screen ">
        <div className="flex flex-col gap-4 p-8 mt-32">
          <h1 className="bg-linear-75 from-violet-500 to-emerald-500 bg-clip-text text-5xl font-extrabold text-transparent   mb-2">
            KipuBank v2
          </h1>
          <div className="flex mb-6 flex-col z-10 items-start gap-2 border p-8 rounded-xl inset-shadow-[#110F2B] inset-shadow-sm">
            <BankCap />
            <Balance />
            <DepositButton />
          </div>
        </div>
      </div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        refresh
      />
    </main>
  );
}
