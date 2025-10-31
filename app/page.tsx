"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import StoryPage from "@/components/story-page"
import MintPage from "@/components/mint-page"
import SuccessPage from "@/components/success-page"

type PageState = "landing" | "story" | "mint" | "success"
type PathChoice = "trick" | "treat"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageState>("landing")
  const [pathChoice, setPathChoice] = useState<PathChoice | null>(null)

  const handleChoosePath = (path: PathChoice) => {
    setPathChoice(path)
    setCurrentPage("story")
  }

  const handleContinueToMint = () => {
    setCurrentPage("mint")
  }

  const handleMintSuccess = () => {
    setCurrentPage("success")
  }

  const handleBackToLanding = () => {
    setCurrentPage("landing")
    setPathChoice(null)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {currentPage === "landing" && <LandingPage onChoosePath={handleChoosePath} />}
      {currentPage === "story" && pathChoice && (
        <StoryPage path={pathChoice} onContinue={handleContinueToMint} onBack={handleBackToLanding} />
      )}
      {currentPage === "mint" && pathChoice && (
        <MintPage path={pathChoice} onBack={handleBackToLanding} onMintSuccess={handleMintSuccess} />
      )}
      {currentPage === "success" && pathChoice && <SuccessPage path={pathChoice} onBackHome={handleBackToLanding} />}
    </main>
  )
}
