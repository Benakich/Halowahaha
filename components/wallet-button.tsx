"use client"

import { ConnectKitButton } from "connectkit"

export function WalletButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, truncatedAddress }) => (
        <button
          onClick={show}
          className="px-4 py-2 rounded-lg font-semibold transition-all bg-purple-600 hover:bg-purple-500 text-white text-sm"
        >
          {isConnecting ? "Connecting..." : isConnected ? truncatedAddress : "Connect Wallet"}
        </button>
      )}
    </ConnectKitButton.Custom>
  )
}
