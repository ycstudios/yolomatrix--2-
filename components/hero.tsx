"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [buttonTextIndex, setButtonTextIndex] = useState(0)
  const [fallbackActive, setFallbackActive] = useState(false)
  const videoRef = useRef(null)
  const { t, getButtonTexts } = useLanguage()
  const { theme, resolvedTheme } = useTheme()
  const isLightMode = theme === "light" || resolvedTheme === "light"
  
  // Internal video file path
  const videoUrl = "/Video/yolohero.mp4"
  // Image fallback for faster loading and iOS compatibility
  const posterImage = "/images/hero-poster.jpg"
  
  const buttonTexts = getButtonTexts()
  
  useEffect(() => {
    setIsLoaded(true)
    
    // Optimize video loading
    const videoElement = videoRef.current
    if (videoElement) {
      // Set video attributes for optimal loading
      videoElement.load()
      videoElement.setAttribute('playsinline', '')
      videoElement.setAttribute('muted', '')
      videoElement.muted = true // Explicit mute for iOS
      
      // Force play for iOS
      document.addEventListener('touchstart', () => {
        if (videoElement.paused) videoElement.play()
      }, {once: true})
    }
  }, [])
  
  useEffect(() => {
    const buttonIntervalId = setInterval(() => {
      setButtonTextIndex((prevIndex) => (prevIndex + 1) % buttonTexts.length)
    }, 5000)
    return () => {
      clearInterval(buttonIntervalId)
    }
  }, [buttonTexts.length])
  
  const scrollToSearch = () => {
    const searchElement = document.getElementById("search-section")
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" })
    }
  }
  
  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }
  
  return (
    <section className="relative w-full overflow-hidden h-[90vh] sm:h-screen">
      {/* Loading placeholder */}
      {!videoLoaded && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          isLightMode ? "bg-gray-100" : "bg-gray-900"
        )}>
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        </div>
      )}
      
      {/* Video Background with optimization */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full",
          isLightMode ? "bg-gray-100" : "bg-black",
          !videoLoaded && "opacity-0" // Hide until loaded
        )}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLightMode ? "opacity-80" : "opacity-100",
            videoLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src="/Video/yolohero.webm" type="video/webm" />
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
          {/* You can keep other hero content here if needed */}
        </div>
        
        {/* Bottom Buttons Container */}
        <div className="absolute bottom-16 sm:bottom-20 flex flex-col items-center space-y-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToSearch}
            className={cn(
              "animate-bounce rounded-full",
              isLightMode ? "text-blue-800" : "text-white"
            )}
          >
            <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="sr-only">Scroll Down</span>
          </Button>
        </div>
      </div>
    </section>
  )
}