"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [buttonTextIndex, setButtonTextIndex] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(true)
  const { t, getButtonTexts } = useLanguage()
  const { theme, resolvedTheme } = useTheme()
  const isLightMode = theme === "light" || resolvedTheme === "light"

  const buttonTexts = getButtonTexts()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    // Set up button text rotation every 5 seconds
    const buttonIntervalId = setInterval(() => {
      setButtonTextIndex((prevIndex) => (prevIndex + 1) % buttonTexts.length)
    }, 5000)

    // Set up subtitle rotation with fade effect
    const subtitleIntervalId = setInterval(() => {
      // Fade out subtitle
      setSubtitleVisible(false)
      
      setTimeout(() => {
        // Fade in subtitle with slight delay
        setSubtitleVisible(true)
      }, 500) // Wait for fade out before showing again
      
    }, 5000)

    // Cleanup intervals on unmount
    return () => {
      clearInterval(buttonIntervalId)
      clearInterval(subtitleIntervalId)
    }
  }, [buttonTexts.length])

  const scrollToSearch = () => {
    const searchElement = document.getElementById("search-section")
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className={cn(
        "absolute inset-0 w-full h-full",
        isLightMode ? "bg-gray-100" : "bg-black"
      )}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={cn(
            "w-full h-full object-cover",
            isLightMode ? "opacity-80" : "opacity-100"
          )}
        >
          <source src="/assets/HeroVideo.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay */}
      <div
        className={cn(
          "absolute inset-0",
          isLightMode
            ? "bg-gradient-to-b from-white/40 via-transparent to-white/50"
            : "bg-gradient-to-b from-black/60 via-black/30 to-black/70"
        )}
      />

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        <div
          className={cn(
            "max-w-5xl transition-all duration-1000 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          {/* Static Logo - Smaller Size */}
          <div className="mb-6 flex justify-center">
            <img 
              src="/images/logo.png" 
              alt="Company Logo" 
              className="h-20 md:h-32 lg:h-40 w-auto"
            />
          </div>

          {/* Tagline with Appear Effect */}
          <p
            className={cn(
              "text-sm md:text-base font-light italic mb-8",
              "transition-all duration-700",
              subtitleVisible ? "opacity-100" : "opacity-0",
              isLightMode ? "text-gray-700" : "text-white/90"
            )}
          >
            {t("hero.tagline")}
          </p>

          {/* Button Section with Enhanced Animation */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 mt-8",
              "transition-all duration-700",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button
              size="lg"
              className={cn(
                "rounded-full text-white px-8 transition-all duration-300",
                isLightMode
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
              )}
              onClick={() => window.location.href = '/search'}
            >
              {buttonTexts[buttonTextIndex] || t("hero.explore")}
            </Button>
          </div>
        </div>

        {/* Scroll Down Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToSearch}
          className={cn(
            "absolute bottom-8 animate-bounce rounded-full",
            isLightMode ? "text-blue-800" : "text-white"
          )}
        >
          <ChevronDown className="h-8 w-8" />
          <span className="sr-only">Scroll Down</span>
        </Button>
      </div>
    </section>
  )
}