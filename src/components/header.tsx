"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBalance, useAccount } from "wagmi";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { address } = useAccount();
  const { data: balanceData } = useBalance({
    address,
    watch: true,
  });

  return (
    <header className="flex justify-between items-center p-4">
      <div className="text-xl font-bold tracking-tight text-transparent bg-linear-75 from-violet-500 to-emerald-500 bg-clip-text">
        KipuBank v2
      </div>

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const connected = mounted && account && chain;

          return (
            <div className="flex items-center gap-3 min-w-[280px] justify-end">
              {connected && (
                <>
                  {/* Chain Button */}
                  <Button
                    onClick={openChainModal}
                    variant="outline"
                    className="flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 transition"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        src={chain.iconUrl}
                        alt={chain.name ?? "Chain icon"}
                        className="w-4 h-4 rounded-full"
                      />
                    )}
                    <span className="text-sm">{chain.name}</span>
                  </Button>

                  {/* Balance */}
                  {balanceData && (
                    <span className="text-sm text-muted-foreground font-medium">
                      {Number(balanceData.formatted).toFixed(4)}{" "}
                      {balanceData.symbol}
                    </span>
                  )}
                </>
              )}

              {/* Connect / Account button */}
              {connected ? (
                <Button
                  onClick={openAccountModal}
                  variant="secondary"
                  className="bg-indigo-900 text-white hover:bg-indigo-800 transition-all"
                >
                  {account.displayName}
                </Button>
              ) : (
                <Button
                  onClick={openConnectModal}
                  variant="secondary"
                  className="bg-indigo-900 text-white hover:bg-indigo-800 transition-all"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </header>
  );
}
