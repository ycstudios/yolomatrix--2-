"use client"

import Image from "next/image"
import Link from "next/link"
import { Headphones, Shield, Clock, Users, Calendar, ShoppingBag, ChefHat, Anchor, Map, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ConciergeCard() {
  const { t } = useLanguage()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
        {/* Image section - full width on mobile, 1/3 on tablet, 2/7 on desktop */}
        <div className="md:col-span-1 lg:col-span-2 h-52 md:h-full relative">
          <Image
            src="/images/Concierge/concierge-security-maryland_J6L0f0D.avif"
            alt="Premium Concierge Services"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          {/* Title overlay - visible on all screens */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              <h3 className="text-xl font-bold text-white">{t("category.concierge")}</h3>
            </div>
            <p className="text-sm text-white/80 mt-1">Exclusive premium services</p>
          </div>
        </div>
        
        {/* Content section - full width on mobile, 2/3 on tablet, 5/7 on desktop */}
        <div className="md:col-span-2 lg:col-span-5 p-5">
          <div className="hidden md:block mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t("category.concierge")}</h3>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Elevate your experience with our premium concierge services. Our dedicated team ensures personalized attention to every detail.
          </p>
          
          {/* Features - 2 column grid with badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-3 mb-5">
            {[
              { icon: Headphones, title: "24/7 Support" },
              { icon: Shield, title: "Privacy Guaranteed" },
              { icon: Clock, title: "Quick Response" },
              { icon: Users, title: "Dedicated Team" },
              { icon: Calendar, title: "Event Planning" },
              { icon: ShoppingBag, title: "Personal Shopping" },
              { icon: ChefHat, title: "Private Chef" },
              { icon: Anchor, title: "Yacht Charters" },
              { icon: Map, title: "Cultural Tours" },
              { icon: Heart, title: "Wellness Retreats" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center bg-blue-50 dark:bg-blue-900/20 rounded-lg px-2 py-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <feature.icon className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1.5 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
          
          {/* CTA Button with accent */}
          <div className="flex">
            <Link href="/concierge" className="flex-1">
              <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center">
                <span>Explore Concierge Services</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}