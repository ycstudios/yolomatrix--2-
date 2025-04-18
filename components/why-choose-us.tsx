"use client"

import { useState, useEffect } from "react"
import { 
  Award, Shield, Clock, Users, Globe, Sparkles
} from "lucide-react"

export default function WhyChooseUs() {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

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

  // Effect to cycle through the features
  useEffect(() => {
    const cycleFeatures = () => {
      setIsAnimating(true)
      
      // After animation starts, wait for exit animation to complete
      setTimeout(() => {
        setCurrentFeatureIndex(prevIndex => 
          prevIndex === features.length - 1 ? 0 : prevIndex + 1
        )
        
        // Reset animation state for entrance animation
        setIsAnimating(false)
      }, 500) // Exit animation duration
    }

    // Set up interval to switch features
    const interval = setInterval(cycleFeatures, 5000) // Change feature every 5 seconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [features.length])

  const currentFeature = features[currentFeatureIndex]

  return (
    <section className="py-6 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay to make content readable */}
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/Video/WhatsApp Video 2025-04-18 at 9.31.51 PM.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-3xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-4">
          <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-2" />
          <h2 className="text-xl md:text-2xl font-light text-white tracking-wide">
            Why Choose Us
          </h2>
          <p className="text-xs text-amber-100/80 mt-1 font-light tracking-wider">
            Discover a better way to experience luxury.
          </p>
          <div className="mx-auto w-12 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mt-2" />
        </div>

        {/* Single Feature Card with Pop-up Effect */}
        <div className="relative h-40 flex items-center justify-center">
          <div 
            className={`feature-card w-full max-w-sm mx-auto bg-black/40 backdrop-blur-md 
                       border border-amber-200/20 text-white p-4 rounded-lg shadow-lg
                       transition-all duration-500 ease-in-out
                       ${isAnimating ? 'feature-exit' : 'feature-enter'}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-2 rounded-full bg-amber-900/20 mb-2">
                {currentFeature.icon}
              </div>
              <h3 className="text-sm sm:text-base font-medium tracking-wide mb-1">
                {currentFeature.title}
              </h3>
              <p className="text-xs text-amber-100/80 font-light">
                {currentFeature.description}
              </p>
            </div>
          </div>
        </div>

        {/* Feature Navigation Dots */}
        <div className="flex justify-center mt-3 space-x-1">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true)
                setTimeout(() => {
                  setCurrentFeatureIndex(index)
                  setIsAnimating(false)
                }, 500)
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentFeatureIndex 
                  ? 'bg-amber-500 w-3' 
                  : 'bg-amber-500/30 hover:bg-amber-500/50'
              }`}
              aria-label={`View feature ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Pop-up animations */
        .feature-enter {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        
        .feature-exit {
          opacity: 0;
          transform: translateY(10px) scale(0.95);
        }
        
        /* Add initial animation on load */
        @keyframes initialPopUp {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .feature-card {
          animation: initialPopUp 0.6s ease-out;
          box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.3), 
                     0 6px 8px -4px rgba(0, 0, 0, 0.2),
                     0 0 10px rgba(245, 158, 11, 0.1);
        }
        
        .feature-card:hover {
          box-shadow: 0 10px 20px -4px rgba(0, 0, 0, 0.4), 
                     0 8px 10px -4px rgba(0, 0, 0, 0.3),
                     0 0 12px rgba(245, 158, 11, 0.15);
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  )
}