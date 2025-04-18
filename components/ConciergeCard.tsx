"use client"

import Image from "next/image"
import Link from "next/link"
import { Headphones, Shield, Clock, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ConciergeCard() {
  const { t } = useLanguage()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Image section - 5 columns on md+ */}
        <div className="md:col-span-5 h-64 md:h-auto relative">
          <Image
            src="/images/Concierge/concierge-security-maryland_J6L0f0D.avif"
            alt="Premium Concierge Services"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent md:bg-gradient-to-t md:from-black/60 md:via-transparent md:to-transparent" />
          
          {/* Mobile title overlay - visible only on small screens */}
          <div className="absolute inset-0 flex items-center md:hidden p-6">
            <h3 className="text-2xl font-bold text-white">{t("category.concierge")}</h3>
          </div>
        </div>
        
        {/* Content section - 7 columns on md+ */}
        <div className="md:col-span-7 p-6">
          {/* Desktop title - hidden on small screens */}
          <h3 className="hidden md:block text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("category.concierge")}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Elevate your experience with our premium concierge services. Our dedicated team ensures personalized attention to every detail of your stay, from airport transfers to exclusive event access.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <Headphones className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">24/7 Support</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Always available for assistance</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Privacy Guaranteed</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Discreet service always</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Quick Response</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fast turnaround on requests</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Dedicated Team</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Personalized service</p>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <Link href="/concierge">
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Explore Concierge Services
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}