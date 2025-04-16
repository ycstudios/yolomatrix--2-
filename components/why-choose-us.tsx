"use client"

import { useEffect, useState } from "react"
import { 
  Award, Shield, Clock, Users, Globe, Sparkles, Diamond, Plane, Gem, 
  Crown, Heart, Star, Wine, Briefcase, Key, Compass, Trophy, Medal, 
  Gift, Landmark, Champagne, Glasses, Feather, Zap
} from "lucide-react"

export default function WhyChooseUs() {
  const [floatingElements, setFloatingElements] = useState([])

  const luxuryKeywords = [
    "Exclusive", "Premium", "Elite", "Luxury", "VIP", "First-Class", 
    "Prestigious", "Exquisite", "Refined", "Bespoke", "Opulent", 
    "Artisanal", "Curated", "Exceptional", "Distinguished"
  ]

  const floatingIcons = [
    Diamond, Plane, Gem, Crown, Heart, Star, Wine, Briefcase, Key,
    Compass, Trophy, Medal, Gift, Landmark, Champagne, Glasses
  ]

  const features = [
    {
      icon: <Award className="h-6 w-6 text-amber-500" />,
      title: "Unmatched Quality",
      description: "Finest properties, vehicles, and experiences curated for you.",
    },
    {
      icon: <Shield className="h-6 w-6 text-amber-500" />,
      title: "Absolute Privacy",
      description: "Confidential bookings & secure arrangements.",
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      title: "24/7 Concierge",
      description: "We're available anytime, anywhere, for anything.",
    },
    {
      icon: <Users className="h-6 w-6 text-amber-500" />,
      title: "Personalized Service",
      description: "Bespoke luxury tailored to your preferences.",
    },
    {
      icon: <Globe className="h-6 w-6 text-amber-500" />,
      title: "Global Presence",
      description: "Access luxury around the world.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      title: "Exceptional Experiences",
      description: "Unforgettable moments you won't find anywhere else.",
    },
  ]

  useEffect(() => {
    const generateFloatingElements = () => {
      const elements = []

      // Create premium themed clusters of elements - with more compact vertical distribution
      const createCluster = (centerX, centerY, count, isIconDominant = false) => {
        for (let i = 0; i < count; i++) {
          // Generate position with more controlled placement for elegance
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * 10 + 3 // Tighter clusters for premium feel
          const posX = centerX + Math.cos(angle) * distance
          // Compress vertical distance to reduce height
          const posY = centerY + (Math.sin(angle) * distance * 0.7)

          // Make sure position is within bounds
          const boundedPosX = Math.max(5, Math.min(95, posX))
          const boundedPosY = Math.max(5, Math.min(95, posY))

          // Smaller sizes for compact layout
          const size = Math.random() * 1 + 0.6
          const opacity = Math.random() * 0.15 + 0.05
          const animDuration = Math.random() * 60 + 40
          const animDelay = Math.random() * -40
          const rotate = Math.random() * 360

          // Determine if this element should be an icon or text
          const isIcon = isIconDominant ? Math.random() > 0.3 : Math.random() > 0.7

          if (isIcon) {
            const IconComponent = floatingIcons[Math.floor(Math.random() * floatingIcons.length)]
            elements.push({
              type: 'icon',
              component: IconComponent,
              posX: boundedPosX,
              posY: boundedPosY,
              size: Math.max(size, 0.8), 
              opacity,
              animDuration,
              animDelay,
              rotate,
              scale: Math.random() * 0.3 + 0.7,
              hasShimmer: Math.random() > 0.7,
            })
          } else {
            const keyword = luxuryKeywords[Math.floor(Math.random() * luxuryKeywords.length)]
            elements.push({
              type: 'text',
              content: keyword,
              posX: boundedPosX,
              posY: boundedPosY,
              size: Math.max(size * 0.7, 0.5), // Smaller text for compactness
              opacity,
              animDuration,
              animDelay,
              rotate,
              fontWeight: Math.random() > 0.6 ? 'light' : 'normal',
              isItalic: Math.random() > 0.7,
              fontFamily: Math.random() > 0.5 ? 'serif' : 'sans-serif',
              hasGlow: Math.random() > 0.8,
            })
          }
        }
      }

      // Create clusters with vertically compressed distribution
      createCluster(15, 10, 6, true) // Top-left, icon-dominant
      createCluster(85, 10, 6, false) // Top-right, text-dominant
      createCluster(50, 20, 8, true) // Upper center, icon-dominant
      createCluster(25, 35, 6, false) // Mid-left, text-dominant
      createCluster(75, 35, 6, true) // Mid-right, icon-dominant
      createCluster(15, 60, 5, false) // Lower-left, text-dominant
      createCluster(85, 60, 5, true) // Lower-right, icon-dominant

      // Add scattered individual elements with compressed vertical placement
      for (let i = 0; i < 15; i++) {
        const posX = 10 + Math.random() * 80
        // Compress vertical randomness
        const posY = 10 + Math.random() * 55
        const size = Math.random() * 0.8 + 0.4 // Smaller size for compactness
        const opacity = Math.random() * 0.12 + 0.04
        const animDuration = Math.random() * 70 + 50
        const animDelay = Math.random() * -50
        const rotate = Math.random() * 360

        const isIcon = Math.random() > 0.6

        if (isIcon) {
          const IconComponent = floatingIcons[Math.floor(Math.random() * floatingIcons.length)]
          elements.push({
            type: 'icon',
            component: IconComponent,
            posX,
            posY,
            size: Math.max(size, 0.6),
            opacity,
            animDuration,
            animDelay,
            rotate,
            scale: Math.random() * 0.3 + 0.6,
            hasShimmer: Math.random() > 0.7,
          })
        } else {
          const keyword = luxuryKeywords[Math.floor(Math.random() * luxuryKeywords.length)]
          elements.push({
            type: 'text',
            content: keyword,
            posX,
            posY,
            size: Math.max(size * 0.7, 0.5),
            opacity,
            animDuration,
            animDelay,
            rotate,
            fontWeight: Math.random() > 0.7 ? 'light' : 'normal',
            isItalic: Math.random() > 0.8,
            fontFamily: Math.random() > 0.5 ? 'serif' : 'sans-serif',
            hasGlow: Math.random() > 0.8,
          })
        }
      }

      setFloatingElements(elements)
    }

    generateFloatingElements()
  }, [])

  return (
    <section className="py-12 relative bg-gradient-to-b from-white to-gray-50 dark:from-[#0c0e14] dark:to-[#0d1117] transition-colors duration-500 overflow-hidden">
      {/* Premium background textures and effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-3 dark:opacity-8 z-0 pointer-events-none" />
      
      {/* Enhanced gradient accents with more depth and elegance - vertically compressed */}
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-gradient-to-br from-amber-300/20 to-amber-600/10 dark:from-amber-500/10 dark:to-amber-700/5 blur-3xl rounded-full z-0 pointer-events-none" />
      <div className="absolute -bottom-16 right-1/4 w-64 h-40 bg-gradient-to-br from-amber-200/10 to-rose-300/5 dark:from-amber-400/5 dark:to-rose-500/5 blur-3xl rounded-full z-0 pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-80 h-48 bg-gradient-to-tl from-blue-200/5 to-amber-300/10 dark:from-blue-400/5 dark:to-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />
      
      {/* Premium sheen effect - enhanced */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-amber-100/5 to-white/0 dark:from-transparent dark:via-amber-900/5 dark:to-transparent z-0 pointer-events-none" />

      {/* Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute flex items-center justify-center ${
              element.type === 'icon' ? 'floating-icon' : 'floating-text'
            } ${element.hasShimmer ? 'shimmer-effect' : ''} ${element.hasGlow ? 'text-glow' : ''}`}
            style={{
              left: `${element.posX}%`,
              top: `${element.posY}%`,
              opacity: element.opacity,
              transform: `rotate(${element.rotate}deg) scale(${element.scale || 1})`,
              animation: `premiumFloat${index % 6 + 1} ${element.animDuration}s infinite alternate ease-in-out`,
              animationDelay: `${element.animDelay}s`
            }}
          >
            {element.type === 'icon' ? (
              <element.component 
                size={element.size * 16} 
                className={`text-amber-600/80 dark:text-amber-400/60 ${
                  index % 5 === 0 ? 'filter drop-shadow-sm' : ''
                } ${element.hasShimmer ? 'shimmer-icon' : ''}`}
                strokeWidth={1.25}
              />
            ) : (
              <span 
                className={`text-amber-800/70 dark:text-amber-300/50
                  ${element.fontWeight === 'light' ? 'font-light' : 'font-normal'}
                  ${element.isItalic ? 'italic' : ''}
                  ${element.fontFamily === 'serif' ? 'font-serif' : 'font-sans'}
                  ${element.hasGlow ? 'text-glow' : ''}
                `}
                style={{ fontSize: `${element.size}rem` }}
              >
                {element.content}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Content - Reduced padding and margins */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-4" />
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-amber-300 dark:to-amber-500 tracking-wide">
            Why Choose Us
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-light tracking-wider">
            Discover a better way to experience luxury.
          </p>
          <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mt-4" />
        </div>

        {/* Feature Scrolling Area - Compressed height */}
        <div className="relative overflow-hidden mx-auto w-full">
          {/* First scrolling row - Left to Right - reduced margins and padding */}
          <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-5 scroll-animation-left">
            {[...features].map((feature, index) => (
              <div
                key={`left-${index}`}
                className="min-w-[180px] xs:min-w-[200px] sm:min-w-[280px] md:min-w-[320px] bg-white/70 dark:bg-white/5 backdrop-blur-md border border-amber-200/20 dark:border-amber-500/10 text-gray-900 dark:text-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 flex-shrink-0 hover:bg-white/90 dark:hover:bg-white/8"
              >
                <div className="mb-1 sm:mb-2 flex items-center">
                  <div className="p-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 mr-2.5">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-medium tracking-wide">{feature.title}</h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-light">{feature.description}</p>
              </div>
            ))}
            {/* Duplicate for continuous loop */}
            {[...features].map((feature, index) => (
              <div
                key={`left-dup-${index}`}
                className="min-w-[180px] xs:min-w-[200px] sm:min-w-[280px] md:min-w-[320px] bg-white/70 dark:bg-white/5 backdrop-blur-md border border-amber-200/20 dark:border-amber-500/10 text-gray-900 dark:text-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 flex-shrink-0 hover:bg-white/90 dark:hover:bg-white/8"
              >
                <div className="mb-1 sm:mb-2 flex items-center">
                  <div className="p-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 mr-2.5">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-medium tracking-wide">{feature.title}</h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-light">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Second scrolling row - Right to Left - reduced margins and padding */}
          <div className="flex gap-3 sm:gap-4 scroll-animation-right">
            {[...features].reverse().map((feature, index) => (
              <div
                key={`right-${index}`}
                className="min-w-[180px] xs:min-w-[200px] sm:min-w-[280px] md:min-w-[320px] bg-white/70 dark:bg-white/5 backdrop-blur-md border border-amber-200/20 dark:border-amber-500/10 text-gray-900 dark:text-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 flex-shrink-0 hover:bg-white/90 dark:hover:bg-white/8"
              >
                <div className="mb-1 sm:mb-2 flex items-center">
                  <div className="p-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 mr-2.5">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-medium tracking-wide">{feature.title}</h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-light">{feature.description}</p>
              </div>
            ))}
            {/* Duplicate for continuous loop */}
            {[...features].reverse().map((feature, index) => (
              <div
                key={`right-dup-${index}`}
                className="min-w-[180px] xs:min-w-[200px] sm:min-w-[280px] md:min-w-[320px] bg-white/70 dark:bg-white/5 backdrop-blur-md border border-amber-200/20 dark:border-amber-500/10 text-gray-900 dark:text-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 flex-shrink-0 hover:bg-white/90 dark:hover:bg-white/8"
              >
                <div className="mb-1 sm:mb-2 flex items-center">
                  <div className="p-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 mr-2.5">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-medium tracking-wide">{feature.title}</h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Premium float animations with less vertical movement */
        @keyframes premiumFloat1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(8px, 5px) rotate(3deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes premiumFloat2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-6px, 4px) rotate(2deg); }
          66% { transform: translate(6px, -4px) rotate(-2deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes premiumFloat3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(8px, 3px) rotate(1deg); }
          50% { transform: translate(3px, -7px) rotate(-1deg); }
          75% { transform: translate(-6px, -3px) rotate(1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes premiumFloat4 {
          0% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-4px, 5px) rotate(1deg); }
          40% { transform: translate(7px, 3px) rotate(-1deg); }
          60% { transform: translate(4px, -6px) rotate(1deg); }
          80% { transform: translate(-5px, -3px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes premiumFloat5 {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-8px, -3px) rotate(-1deg); }
          50% { transform: translate(5px, 6px) rotate(2deg); }
          75% { transform: translate(3px, -5px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes premiumFloat6 {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(4px, -6px) rotate(-2deg); }
          66% { transform: translate(-5px, 4px) rotate(1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        /* Shimmer effect for icons - high-end feel */
        @keyframes shimmer {
          0% { filter: brightness(1) drop-shadow(0 0 2px rgba(245, 158, 11, 0)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 4px rgba(245, 158, 11, 0.3)); }
          100% { filter: brightness(1) drop-shadow(0 0 2px rgba(245, 158, 11, 0)); }
        }
        
        .shimmer-effect {
          animation: shimmer 8s infinite ease-in-out;
        }
        
        /* Text glow for premium feel */
        .text-glow {
          text-shadow: 0 0 3px rgba(245, 158, 11, 0.2);
        }
        
        /* Premium hover effects for floating elements - enhanced */
        .floating-icon:hover {
          filter: brightness(1.4) drop-shadow(0 0 4px rgba(245, 158, 11, 0.4));
          transition: all 0.5s ease;
        }
        
        .floating-text:hover {
          text-shadow: 0 0 4px rgba(245, 158, 11, 0.4);
          transition: all 0.5s ease;
        }
        
        .shimmer-icon {
          filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.2));
        }
        
        /* Scrolling animations for cards - responsive adjustments */
        .scroll-animation-left {
          display: flex;
          animation: scrollLeft 120s linear infinite;
          width: max-content;
        }
        
        .scroll-animation-right {
          display: flex;
          animation: scrollRight 120s linear infinite;
          width: max-content;
        }
        
        /* Extra small screens */
        @media (max-width: 575px) {
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-180px * 6 - 0.75rem * 6)); }
          }
          
          @keyframes scrollRight {
            0% { transform: translateX(calc(-180px * 6 - 0.75rem * 6)); }
            100% { transform: translateX(0); }
          }
        }
        
        /* Small screens */
        @media (min-width: 576px) and (max-width: 640px) {
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-200px * 6 - 0.75rem * 6)); }
          }
          
          @keyframes scrollRight {
            0% { transform: translateX(calc(-200px * 6 - 0.75rem * 6)); }
            100% { transform: translateX(0); }
          }
        }
        
        /* Medium screens */
        @media (min-width: 641px) and (max-width: 768px) {
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-280px * 6 - 1rem * 6)); }
          }
          
          @keyframes scrollRight {
            0% { transform: translateX(calc(-280px * 6 - 1rem * 6)); }
            100% { transform: translateX(0); }
          }
        }
        
        /* Large screens */
        @media (min-width: 769px) {
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-320px * 6 - 1rem * 6)); }
          }
          
          @keyframes scrollRight {
            0% { transform: translateX(calc(-320px * 6 - 1rem * 6)); }
            100% { transform: translateX(0); }
          }
        }
        
        /* Pause animations on hover with smooth transition */
        .scroll-animation-left:hover,
        .scroll-animation-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}