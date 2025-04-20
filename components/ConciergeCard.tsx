"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, ShoppingBag, ChefHat, Anchor, Map, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ConciergeCard() {
  const { t } = useLanguage()

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

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-950 p-2 md:p-8">
      {/* Mobile Version Card - REDUCED SIZE */}
      <div className="md:hidden w-full">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg text-white">
          <div className="p-3">
            {/* Header Section - Reduced sizes */}
            <h2 className="text-lg font-serif text-amber-100 mb-1">Your Private Concierge, Redefined</h2>
            
            <p className="text-xs mb-2">
              Luxury is not just service — It's anticipation. Our concierge team crafts seamless experiences, tailored to your every desire.
            </p>
            
            {/* Features - Tighter spacing */}
            <div className="grid grid-cols-2 gap-y-1 gap-x-1 mb-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-amber-900/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-amber-300" />
                  </div>
                  <span className="text-xs">{feature.title}</span>
                </div>
              ))}
            </div>
            
            {/* Signature Services Title - Smaller */}
            <h3 className="text-sm font-serif text-amber-100 mb-2">Signature Services</h3>
            
            {/* Services - Tighter grid with smaller text */}
            <div className="grid grid-cols-1 gap-2 mb-3">
              {services.map((service, index) => (
                <div key={index} className="flex space-x-2">
                  <div className="rounded-full p-1 bg-amber-900/20 h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-3 w-3 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-amber-100">{service.title}</h4>
                    <p className="text-xs text-gray-400">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Button - Smaller padding */}
            <div className="mt-3 flex justify-center">
              <Link href="/concierge" className="w-full">
                <button className="w-full py-2 bg-amber-100 text-gray-900 rounded text-xs font-medium transition-all duration-300 hover:bg-amber-200">
                  Start Your Journey with Us
                </button>
              </Link>
            </div>
            
            <p className="text-xs text-center mt-2 text-gray-400">
              A concierge specialist is ready to assist you 24/7
            </p>
          </div>
        </div>
      </div>
      
      {/* Desktop Version Card - Unchanged */}
      <div className="hidden md:block">
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl text-white">
          <div className="grid grid-cols-12">
            {/* Left Section */}
            <div className="col-span-4 p-8">
              <h2 className="text-3xl font-serif text-amber-100 mb-4">Your Private Concierge, Redefined</h2>
              
              <p className="text-sm mb-8">
                Luxury is not just service — It's anticipation. Our concierge team crafts seamless experiences, tailored to your every desire.
              </p>
              
              <div className="grid grid-cols-2 gap-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-amber-900/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-amber-300" />
                    </div>
                    <span className="text-sm">{feature.title}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl font-serif text-amber-100">Signature Services</h3>
            </div>
            
            {/* Right Section */}
            <div className="col-span-8 p-8">
              <div className="grid grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="rounded-full p-2 bg-amber-900/20 h-10 w-10 flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-100">{service.title}</h4>
                      <p className="text-xs text-gray-400">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link href="/concierge" className="inline-block">
                  <button className="px-8 py-3 bg-amber-100 text-gray-900 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-200">
                    Start Your Journey with Us
                  </button>
                </Link>
              </div>
              
              <p className="text-xs text-center mt-4 text-gray-400">
                A concierge specialist is ready to assist you 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}