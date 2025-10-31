"use client"

import { useState } from "react"
import { WalletButton } from "./wallet-button"

interface LandingPageProps {
  onChoosePath: (path: "trick" | "treat") => void
}

export default function LandingPage({ onChoosePath }: LandingPageProps) {
  const [hoveredButton, setHoveredButton] = useState<"trick" | "treat" | null>(null)

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with animated fog effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-black to-black">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-purple-900 rounded-full blur-3xl animate-fog"></div>
          <div
            className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-orange-900 rounded-full blur-3xl animate-fog"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>

      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 animate-fade-in">
        <WalletButton />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-3 sm:px-4 max-w-2xl animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-balance animate-slide-up">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            The Haunted Mint
          </span>
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 text-balance animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Welcome, brave soul. Your choice will determine your destiny.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-6 sm:mb-8 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          {/* TRICK Button */}
          <button
            onClick={() => onChoosePath("trick")}
            onMouseEnter={() => setHoveredButton("trick")}
            onMouseLeave={() => setHoveredButton(null)}
            className={`relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg transition-all duration-300 w-full sm:w-auto ${
              hoveredButton === "trick" ? "scale-105 shadow-2xl" : "hover:scale-102"
            }`}
            style={{
              background:
                hoveredButton === "trick"
                  ? "linear-gradient(135deg, #4a0e4e 0%, #1a0033 100%)"
                  : "linear-gradient(135deg, #2a0a2e 0%, #0a0a0a 100%)",
              boxShadow:
                hoveredButton === "trick"
                  ? "0 0 30px rgba(138, 43, 226, 0.6), inset 0 0 20px rgba(138, 43, 226, 0.3)"
                  : "0 0 20px rgba(0, 0, 0, 0.5)",
              border: "2px solid rgba(138, 43, 226, 0.5)",
            }}
          >
            <span className="text-purple-200">TRICK</span>
          </button>

          {/* TREAT Button */}
          <button
            onClick={() => onChoosePath("treat")}
            onMouseEnter={() => setHoveredButton("treat")}
            onMouseLeave={() => setHoveredButton(null)}
            className={`relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg transition-all duration-300 w-full sm:w-auto ${
              hoveredButton === "treat" ? "scale-105 shadow-2xl" : "hover:scale-102"
            }`}
            style={{
              background:
                hoveredButton === "treat"
                  ? "linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)"
                  : "linear-gradient(135deg, #cc6b2e 0%, #994d1f 100%)",
              boxShadow:
                hoveredButton === "treat"
                  ? "0 0 30px rgba(255, 107, 53, 0.6), inset 0 0 20px rgba(255, 107, 53, 0.3)"
                  : "0 0 20px rgba(0, 0, 0, 0.5)",
              border: "2px solid rgba(255, 107, 53, 0.5)",
            }}
          >
            <span className="text-orange-100">TREAT</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-400 mt-6 sm:mt-8 animate-pulse-glow">
          Choose wisely... your fate awaits
        </p>
      </div>

      <div className="hidden sm:block absolute top-20 left-10 text-4xl animate-float opacity-50">👻</div>
      <div
        className="hidden sm:block absolute top-40 right-10 text-4xl animate-float opacity-50"
        style={{ animationDelay: "1s" }}
      >
        🎃
      </div>
      <div
        className="hidden sm:block absolute bottom-20 left-1/4 text-4xl animate-float opacity-50"
        style={{ animationDelay: "2s" }}
      >
        👻
      </div>
    </div>
  )
}
