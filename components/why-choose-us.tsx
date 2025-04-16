"use client"

import { useEffect, useState } from "react"
import { Award, Shield, Clock, Users, Globe, Sparkles, Diamond, Plane, Gem, Crown, Heart, Star, Wine, Briefcase, Key } from "lucide-react"

export default function WhyChooseUs() {
  const [floatingElements, setFloatingElements] = useState([])

  const luxuryKeywords = [
    "Exclusive", "Premium", "Elite", "Luxury", "VIP", "First-Class", 
    "Prestigious", "Exquisite", "Refined", "Bespoke", "Opulent", 
    "Upscale", "Lavish", "Private", "Exceptional", "Superior"
  ]

  const floatingIcons = [
    Diamond, Plane, Gem, Crown, Heart, Star, Wine, Briefcase, Key
  ]

  const features = [
    {
      icon: <Award className="h-6 w-6 text-yellow-400" />,
      title: "Unmatched Quality",
      description: "Finest properties, vehicles, and experiences curated for you.",
    },
    {
      icon: <Shield className="h-6 w-6 text-yellow-400" />,
      title: "Absolute Privacy",
      description: "Confidential bookings & secure arrangements.",
    },
    {
      icon: <Clock className="h-6 w-6 text-yellow-400" />,
      title: "24/7 Concierge",
      description: "We're available anytime, anywhere, for anything.",
    },
    {
      icon: <Users className="h-6 w-6 text-yellow-400" />,
      title: "Personalized Service",
      description: "Bespoke luxury tailored to your preferences.",
    },
    {
      icon: <Globe className="h-6 w-6 text-yellow-400" />,
      title: "Global Presence",
      description: "Access luxury around the world.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
      title: "Exceptional Experiences",
      description: "Unforgettable moments you won't find anywhere else.",
    },
  ]

  useEffect(() => {
    const generateFloatingElements = () => {
      const elements = []

      for (let i = 0; i < 40; i++) {
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        const size = Math.random() * 1.5 + 0.8
        const opacity = Math.random() * 0.15 + 0.05
        const animDuration = Math.random() * 50 + 30
        const animDelay = Math.random() * -40
        const rotate = Math.random() * 360

        const isIcon = Math.random() > 0.5

        if (isIcon) {
          const IconComponent = floatingIcons[Math.floor(Math.random() * floatingIcons.length)]
          elements.push({
            type: 'icon',
            component: IconComponent,
            posX,
            posY,
            size: Math.max(size, 1), // Ensure minimum size for visibility
            opacity,
            animDuration,
            animDelay,
            rotate
          })
        } else {
          const keyword = luxuryKeywords[Math.floor(Math.random() * luxuryKeywords.length)]
          elements.push({
            type: 'text',
            content: keyword,
            posX,
            posY,
            size: Math.max(size, 1), // Ensure minimum size for visibility
            opacity,
            animDuration,
            animDelay,
            rotate
          })
        }
      }

      setFloatingElements(elements)
    }

    generateFloatingElements()
  }, [])

  return (
    <section className="py-16 relative bg-white dark:bg-[#0d1117] transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 dark:opacity-10 z-0 pointer-events-none" />
      <div className="absolute -top-24 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20 blur-3xl rounded-full z-0 pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-[300px] h-[300px] bg-purple-600 opacity-10 blur-3xl rounded-full z-0 pointer-events-none" />

      {/* Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center"
            style={{
              left: `${element.posX}%`,
              top: `${element.posY}%`,
              opacity: element.opacity,
              transform: `rotate(${element.rotate}deg)`,
              animation: `float ${element.animDuration}s infinite alternate ease-in-out`,
              animationDelay: `${element.animDelay}s`
            }}
          >
            {element.type === 'icon' ? (
              <element.component 
                size={element.size * 16} 
                className="text-amber-600 dark:text-yellow-300"
              />
            ) : (
              <span 
                className="text-gray-800 dark:text-gray-200 font-light"
                style={{ fontSize: `${element.size}rem` }}
              >
                {element.content}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-yellow-400 dark:to-orange-500">
            Why Choose Us
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Discover a better way to experience luxury.
          </p>
        </div>

        {/* Feature Scrolling Area - Fixed */}
        <div className="relative overflow-hidden mx-auto" style={{ maxWidth: "95%" }}>
          {/* First scrolling row - Left to Right */}
          <div className="flex gap-4 mb-4 scroll-animation-left">
            {[...features].map((feature, index) => (
              <div
                key={`left-${index}`}
                className="min-w-[250px] bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex-shrink-0"
              >
                <div className="mb-2">{feature.icon}</div>
                <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
            {/* Duplicate for continuous loop */}
            {[...features].map((feature, index) => (
              <div
                key={`left-dup-${index}`}
                className="min-w-[250px] bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex-shrink-0"
              >
                <div className="mb-2">{feature.icon}</div>
                <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Second scrolling row - Right to Left (reversed) */}
          <div className="flex gap-4 scroll-animation-right">
            {[...features].reverse().map((feature, index) => (
              <div
                key={`right-${index}`}
                className="min-w-[250px] bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex-shrink-0"
              >
                <div className="mb-2">{feature.icon}</div>
                <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
            {/* Duplicate for continuous loop */}
            {[...features].reverse().map((feature, index) => (
              <div
                key={`right-dup-${index}`}
                className="min-w-[250px] bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex-shrink-0"
              >
                <div className="mb-2">{feature.icon}</div>
                <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        /* Scrolling animations for cards */
        .scroll-animation-left {
          display: flex;
          animation: scrollLeft 80s linear infinite;
          width: max-content;
        }
        
        .scroll-animation-right {
          display: flex;
          animation: scrollRight 80s linear infinite;
          width: max-content;
        }
        
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 6 - 1rem * 6)); }
        }
        
        @keyframes scrollRight {
          0% { transform: translateX(calc(-250px * 6 - 1rem * 6)); }
          100% { transform: translateX(0); }
        }
        
        /* Pause animations on hover */
        .scroll-animation-left:hover,
        .scroll-animation-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}