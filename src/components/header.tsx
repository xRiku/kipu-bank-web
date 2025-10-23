import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="text-xl font-bold tracking-tight">KipuBank v2</div>
      <ConnectButton />
    </header>
  );
}
