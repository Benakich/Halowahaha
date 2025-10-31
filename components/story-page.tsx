"use client"

import { useState, useEffect } from "react"

interface StoryPageProps {
  path: "trick" | "treat"
  onContinue: () => void
  onBack: () => void
}

const stories = {
  trick: {
    title: "The Shadowwood Forest",
    image: "/dark-haunted-forest-at-midnight-with-twisted-trees.jpg",
    narrative: [
      "You've wandered into the Shadowwood Forest where lost souls roam under the pale moonlight. The ancient trees whisper secrets of those who came before, their gnarled branches reaching like skeletal fingers toward the starless sky.",
      "As you venture deeper into the darkness, you feel a presence watching you. The air grows cold, and with each step, the forest seems to close in around you. But something calls to you—a mysterious force that promises power and knowledge beyond mortal comprehension.",
      "You realize you are not alone. Something ancient stirs in the shadows, and it has been waiting for someone like you. The choice you made has sealed your fate. Now, you must face what awaits in the darkness...",
    ],
  },
  treat: {
    title: "The Enchanted Candy Keeper's Cottage",
    image: "/magical-candy-shop-cottage-with-warm-glowing-light.jpg",
    narrative: [
      "The ancient candy keeper has been expecting you. Her cozy cottage glows with warm, golden light, and the air is filled with the sweet aroma of magical confections. Shelves lined with glowing candies and mysterious potions line every wall.",
      "She smiles knowingly as you enter, as if she's seen your arrival in her crystal ball. 'I've been waiting for someone with your spirit,' she says, gesturing to a peculiar candy that shimmers with otherworldly light.",
      "This is no ordinary treat. This candy holds the essence of an ancient Halloween spirit—a guardian that will protect you and guide you through the veil between worlds. The keeper hands it to you with a knowing nod. Your true companion awaits...",
    ],
  },
}

export default function StoryPage({ path, onContinue, onBack }: StoryPageProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const story = stories[path]

  useEffect(() => {
    if (!isTyping) return

    const fullText = story.narrative[currentParagraph]
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTyping(false)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [currentParagraph, isTyping, story.narrative])

  const handleNextParagraph = () => {
    if (isTyping) {
      setDisplayedText(story.narrative[currentParagraph])
      setIsTyping(false)
    } else if (currentParagraph < story.narrative.length - 1) {
      setCurrentParagraph(currentParagraph + 1)
      setDisplayedText("")
      setIsTyping(true)
    } else {
      onContinue()
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-black to-black"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-3 sm:px-4 py-8 sm:py-12 animate-fade-in">
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

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center text-balance animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className={path === "trick" ? "text-purple-400" : "text-orange-400"}>{story.title}</span>
        </h1>

        <div
          className="mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-2xl animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <img
            src={story.image || "/placeholder.svg"}
            alt={story.title}
            className="w-full h-48 sm:h-64 md:h-96 object-cover"
          />
        </div>

        <div
          className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 min-h-40 sm:min-h-48 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 text-balance">
            {displayedText}
            {isTyping && <span className="animate-pulse">▌</span>}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          {story.narrative.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index <= currentParagraph ? (path === "trick" ? "bg-purple-500" : "bg-orange-500") : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={handleNextParagraph}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all hover:scale-105 w-full sm:w-auto ${
              path === "trick"
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : "bg-orange-600 hover:bg-orange-500 text-white"
            }`}
          >
            {isTyping ? "Skip" : currentParagraph < story.narrative.length - 1 ? "Next" : "Reveal Your Fate"}
          </button>
        </div>
      </div>
    </div>
  )
}
