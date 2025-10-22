import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="text-2xl font-bold">KipuBank V2</div>
      <ConnectButton />
    </header>
  );
}
