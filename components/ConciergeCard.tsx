"use client"

import React, { useRef, useEffect, useState } from "react"
import { Calendar, ShoppingBag, ChefHat, Anchor, Map, Heart } from "lucide-react"

export default function ConciergeCard() {
  const scrollContainerRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  // Common services data to ensure consistency between mobile and desktop
  const services = [
    { 
      icon: Calendar, 
      title: "Bespoke Event Planning",
      description: "From intimate gatherings to lavish celebrations"
    },
    { 
      icon: ShoppingBag, 
      title: "Personal Shopping & Styling",
      description: "Fashion consultation, designer access, private showrooms"
    },
    { 
      icon: Map, 
      title: "Curated Cultural Experiences",
      description: "Private museum tours, local artisans. Immersive heritage"
    },
    { 
      icon: ChefHat, 
      title: "Private Chefs & Dining",
      description: "Gourmet menus in your villa, yacht, or retreat"
    },
    { 
      icon: Anchor, 
      title: "Yacht & Jet Charters",
      description: "Cruise or Fly with elite luxury and comfort"
    },
    { 
      icon: Heart,
      title: "Wellness & Rejuvenation",
      description: "Spa getaways, detox programs and holistic care"
    }
  ];

  // Common features
  const features = [
    { title: "24/7 Global Assistance" },
    { title: "Unmatched Privacy & Discretion" },
    { title: "Lightning-Fast Response Time" },
    { title: "Handpicked Concierge Experts" }
  ];

  // Auto-scrolling effect for services
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let scrollInterval
    let scrollPosition = 0

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused) {
          scrollPosition += 1
          scrollContainer.scrollLeft = scrollPosition

          // Reset scroll position when reaching the end
          if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollPosition = 0
          }
        }
      }, 60) // Adjust speed here (lower number = faster)
    }

    startScrolling()

    // Pause scrolling on hover or touch
    const handleMouseEnter = () => setIsPaused(true)
    const handleMouseLeave = () => setIsPaused(false)
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)
    scrollContainer.addEventListener('touchstart', handleMouseEnter)
    scrollContainer.addEventListener('touchend', handleMouseLeave)

    return () => {
      clearInterval(scrollInterval)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
      scrollContainer.removeEventListener('touchstart', handleMouseEnter)
      scrollContainer.removeEventListener('touchend', handleMouseLeave)
    }
  }, [isPaused])

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-950 p-2 md:p-8">
      {/* Mobile Version Card - Unchanged */}
      <div className="md:hidden w-full">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg text-white">
          <div className="p-5">
            {/* Header Section */}
            <h2 className="text-lg font-serif text-amber-100 mb-2 leading-snug">
              Your Private Concierge, Redefined
            </h2>
            
            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
              Luxury is not just service — It's anticipation. Our concierge team crafts seamless experiences, tailored to your every desire.
            </p>
            
            {/* Features - Optimized layout */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-5">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                  </div>
                  <span className="text-[11px] leading-snug text-gray-200">{feature.title}</span>
                </div>
              ))}
            </div>
            
            {/* Signature Services Title */}
            <div className="border-t border-gray-700/50 pt-4 mb-4">
              <h3 className="text-sm font-serif text-amber-100">Signature Services</h3>
            </div>
            
            {/* Services - Auto-scrolling carousel with hidden scrollbar */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-hidden -mx-5 px-5 mb-5"
              style={{
                msOverflowStyle: 'none',  
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              
              <div className="inline-flex space-x-4 pb-2">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="w-56 flex space-x-3 bg-gray-800/30 p-3 rounded-lg flex-shrink-0 cursor-pointer hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="rounded-full p-2 bg-amber-900/20 h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-4 w-4 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-amber-100 leading-snug mb-1">
                        {service.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Duplicate services for seamless infinite scroll */}
                {services.map((service, index) => (
                  <div 
                    key={`duplicate-${index}`} 
                    className="w-56 flex space-x-3 bg-gray-800/30 p-3 rounded-lg flex-shrink-0 cursor-pointer hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="rounded-full p-2 bg-amber-900/20 h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-4 w-4 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-amber-100 leading-snug mb-1">
                        {service.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <a href="/concierge" className="w-full">
                <button className="w-full py-3 bg-gradient-to-r from-amber-100 to-amber-200 text-gray-900 rounded text-sm font-medium transition-all duration-300 hover:from-amber-200 hover:to-amber-300">
                  Start Your Journey with Us
                </button>
              </a>
              
              <p className="text-[11px] text-center mt-2.5 text-gray-400/80">
                A concierge specialist is ready to assist you 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Version Card - Fixed Layout */}
      <div className="hidden md:block">
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl text-white">
          <div className="grid grid-cols-12">
            {/* Left Section */}
            <div className="col-span-4 p-8">
              <h2 className="text-3xl font-serif text-amber-100 mb-4">Your Private Concierge, Redefined</h2>
              
              <p className="text-sm text-gray-300 mb-8">
                Luxury is not just service — It's anticipation. Our concierge team crafts seamless experiences, tailored to your every desire.
              </p>
              
              <div className="grid grid-cols-2 gap-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-amber-900/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-amber-300" />
                    </div>
                    <span className="text-sm text-gray-300">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Section */}
            <div className="col-span-8 p-8">
              {/* Signature Services heading at the top */}
              <h3 className="text-2xl font-serif text-amber-100 mb-8">Signature Services</h3>
              
              <div className="grid grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="rounded-full p-2 bg-amber-900/20 h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-amber-100">{service.title}</h4>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex justify-center">
                <a href="/concierge" className="inline-block">
                  <button className="px-10 py-4 bg-amber-100 text-gray-900 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-amber-200">
                    Start Your Journey with Us
                  </button>
                </a>
              </div>
              
              <p className="text-xs text-center mt-6 text-gray-400">
                A concierge specialist is ready to assist you 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}