"use client"

import { useState } from "react"

interface SuccessPageProps {
  path: "trick" | "treat"
  onBackHome: () => void
}

const successContent = {
  trick: {
    nftImage: "/mysterious-dark-spirit-nft-with-purple-glow-and-et.jpg",
    title: "Your Dark Companion is Born!",
    message: "Your shadow spirit has been successfully minted and bound to your wallet forever.",
    color: "purple",
  },
  treat: {
    nftImage: "/magical-glowing-spirit-nft-with-orange-and-gold-au.jpg",
    title: "Your Magical Guardian is Born!",
    message: "Your enchanted spirit has been successfully minted and blessed upon your wallet.",
    color: "orange",
  },
}

export default function SuccessPage({ path, onBackHome }: SuccessPageProps) {
  const [shareMessage, setShareMessage] = useState("")
  const content = successContent[path]

  const handleShare = async () => {
    const shareText = `I just minted my ${path === "trick" ? "dark companion" : "magical guardian"} NFT from The Haunted Mint! Join me on this spooky Halloween adventure! 🎃👻`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "The Haunted Mint",
          text: shareText,
          url: window.location.origin,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText)
      setShareMessage("Copied to clipboard!")
      setTimeout(() => setShareMessage(""), 3000)
    }
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-3 sm:px-4 animate-fade-in">
        <div className="text-center mb-6 sm:mb-8 animate-bounce-in">
          <div className="text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4">✨</div>
          <div className="text-4xl sm:text-5xl md:text-6xl">🎉</div>
        </div>

        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-center text-balance animate-slide-up ${
            path === "trick" ? "text-purple-400" : "text-orange-400"
          }`}
        >
          {content.title}
        </h1>

        <p
          className="text-center text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          {content.message}
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
          {/* Share Button */}
          <button
            onClick={handleShare}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all hover:scale-105 w-full sm:w-auto ${
              path === "trick"
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : "bg-orange-600 hover:bg-orange-500 text-white"
            }`}
          >
            {shareMessage ? "✓ Copied!" : "Share with Friends"}
          </button>

          {/* Back Home Button */}
          <button
            onClick={onBackHome}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all hover:scale-105 border-2 w-full sm:w-auto ${
              path === "trick"
                ? "border-purple-500 text-purple-400 hover:bg-purple-500/10"
                : "border-orange-500 text-orange-400 hover:bg-orange-500/10"
            }`}
          >
            Back to Home
          </button>
        </div>

        <div
          className="hidden sm:flex mt-12 justify-center gap-8 text-3xl animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="animate-float">🎃</span>
          <span className="animate-float" style={{ animationDelay: "0.2s" }}>
            👻
          </span>
          <span className="animate-float" style={{ animationDelay: "0.4s" }}>
            🎃
          </span>
        </div>
      </div>
    </div>
  )
}
