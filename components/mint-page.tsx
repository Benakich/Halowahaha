"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { WalletButton } from "./wallet-button"

interface MintPageProps {
  path: "trick" | "treat"
  onBack: () => void
  onMintSuccess: () => void
}

const mintContent = {
  trick: {
    title: "Your Dark Companion Awaits",
    description: "A spirit born from the shadows, bound to protect and guide you through the veil between worlds.",
    color: "purple",
    nftImage: "/mysterious-dark-spirit-nft-with-purple-glow-and-et.jpg",
    lore: "This shadow spirit has existed since the dawn of Halloween, collecting the fears and mysteries of countless souls. Now it chooses you as its vessel.",
  },
  treat: {
    title: "Your Magical Guardian",
    description: "A blessed spirit of enchantment, radiating warmth and protection through the magical realms.",
    color: "orange",
    nftImage: "/magical-glowing-spirit-nft-with-orange-and-gold-au.jpg",
    lore: "This guardian spirit has been crafted by ancient magic to protect those pure of heart. It brings luck, joy, and magical blessings to its chosen companion.",
  },
}

export default function MintPage({ path, onBack, onMintSuccess }: MintPageProps) {
  const { address, isConnected } = useAccount()
  const [isMinting, setIsMinting] = useState(false)
  const [isMinted, setIsMinted] = useState(false)
  const content = mintContent[path]

  const handleMint = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }

    setIsMinting(true)
    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsMinting(false)
    setIsMinted(true)
  }

  const handleMintAnother = () => {
    setIsMinted(false)
    onBack()
  }

  const handleViewSuccess = () => {
    onMintSuccess()
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-8 sm:py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-black to-black">
        <div className="absolute inset-0 opacity-20">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 ${
              path === "trick" ? "bg-purple-900" : "bg-orange-900"
            } rounded-full blur-3xl animate-fog`}
          ></div>
        </div>
      </div>

      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 animate-fade-in">
        <WalletButton />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-3 sm:px-4 animate-fade-in">
        <button
          onClick={onBack}
          className={`mb-6 sm:mb-8 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all hover:scale-105 animate-slide-up ${
            path === "trick"
              ? "text-purple-400 border border-purple-500/50 hover:bg-purple-500/10"
              : "text-orange-400 border border-orange-500/50 hover:bg-orange-500/10"
          }`}
        >
          ← Back
        </button>

        {!isMinted ? (
          <>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-center text-balance animate-slide-up ${
                path === "trick" ? "text-purple-400" : "text-orange-400"
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              {content.title}
            </h1>

            <p
              className="text-center text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              {content.description}
            </p>

            <div
              className="mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-2xl border-2 animate-scale-in"
              style={{
                borderColor: path === "trick" ? "rgba(168, 85, 247, 0.5)" : "rgba(249, 115, 22, 0.5)",
                animationDelay: "0.3s",
              }}
            >
              <div className="relative">
                <img
                  src={content.nftImage || "/placeholder.svg"}
                  alt="Your Mystery NFT"
                  className="w-full h-48 sm:h-64 md:h-96 object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    path === "trick" ? "from-purple-900/50 to-transparent" : "from-orange-900/50 to-transparent"
                  }`}
                ></div>
              </div>
            </div>

            <div
              className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-200">Your Mystery NFT Awaits...</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4 text-balance">{content.lore}</p>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-gray-400">Collection</p>
                  <p className="text-white font-semibold">The Haunted Mint</p>
                </div>
                <div>
                  <p className="text-gray-400">Supply</p>
                  <p className="text-white font-semibold">Limited Edition</p>
                </div>
              </div>
            </div>

            {!isConnected && (
              <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-center animate-pulse-glow">
                <p className="text-sm sm:text-base text-orange-200">Please connect your wallet to mint your NFT</p>
              </div>
            )}

            <div className="flex justify-center animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <button
                onClick={handleMint}
                disabled={isMinting || !isConnected}
                className={`px-8 sm:px-12 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all hover:scale-105 w-full sm:w-auto ${
                  path === "trick"
                    ? "bg-purple-600 hover:bg-purple-500 disabled:bg-purple-700 text-white"
                    : "bg-orange-600 hover:bg-orange-500 disabled:bg-orange-700 text-white"
                } ${isMinting || !isConnected ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {isMinting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-rotate-slow">⚙️</span>
                    Minting...
                  </span>
                ) : (
                  "MINT NFT"
                )}
              </button>
            </div>

            {isConnected && (
              <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 animate-fade-in">
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            )}
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center">
              <div className="mb-6 sm:mb-8 text-5xl sm:text-6xl animate-bounce-in">✨</div>

              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance animate-slide-up ${
                  path === "trick" ? "text-purple-400" : "text-orange-400"
                }`}
              >
                Success!
              </h1>

              <p
                className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 text-balance animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                Your {path === "trick" ? "dark companion" : "magical guardian"} has been minted and is now yours
                forever.
              </p>

              <div
                className="mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-2xl border-2 animate-scale-in"
                style={{
                  borderColor: path === "trick" ? "rgba(168, 85, 247, 0.8)" : "rgba(249, 115, 22, 0.8)",
                  animationDelay: "0.2s",
                }}
              >
                <img
                  src={content.nftImage || "/placeholder.svg"}
                  alt="Your Minted NFT"
                  className="w-full h-48 sm:h-64 md:h-96 object-cover"
                />
              </div>

              <div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <button
                  onClick={handleViewSuccess}
                  className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all hover:scale-105 w-full sm:w-auto ${
                    path === "trick"
                      ? "bg-purple-600 hover:bg-purple-500 text-white"
                      : "bg-orange-600 hover:bg-orange-500 text-white"
                  }`}
                >
                  View Success
                </button>
                <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base border border-gray-500 text-gray-300 hover:text-white hover:border-gray-300 transition-all hover:scale-105 w-full sm:w-auto">
                  View on OpenSea
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
