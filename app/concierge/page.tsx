"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FloatingActions from "@/components/floating-actions"
import CategoryFilter from "@/components/category-filter"
import CategoryItem, { type CategoryItemProps } from "@/components/category-item"
import { useLanguage } from "@/contexts/language-context"
import Footer from "@/components/footer"

// Mock data for concierge services
const conciergeData: CategoryItemProps[] = [
  {
    id: "private-events",
    title: "Private Event Planning",
    description: "Bespoke event planning service for exclusive parties, celebrations, and corporate gatherings.",
    price: 5000,
    priceUnit: "day",
    location: "Global",
    rating: 4.9,
    reviews: 42,
    images: ["/placeholder.svg?height=800&width=1200"],
    amenities: ["staff", "security"],
    featured: true,
    categoryType: "concierge",
  },
  {
    id: "personal-shopping",
    title: "Personal Shopping Experience",
    description: "VIP shopping experiences with exclusive access to designer collections and private showrooms.",
    price: 2000,
    priceUnit: "day",
    location: "Paris, Milan, New York",
    rating: 4.8,
    reviews: 36,
    images: ["/placeholder.svg?height=800&width=1200"],
    amenities: ["staff"],
    categoryType: "concierge",
  },
  {
    id: "private-chef",
    title: "Private Chef Service",
    description: "Michelin-starred chefs creating personalized dining experiences in your luxury accommodation.",
    price: 1500,
    priceUnit: "day",
    location: "Global",
    rating: 4.9,
    reviews: 58,
    images: ["/placeholder.svg?height=800&width=1200"],
    amenities: ["staff"],
    categoryType: "concierge",
  },
  {
    id: "yacht-charter",
    title: "Yacht Charter Arrangement",
    description:
      "End-to-end yacht charter service including crew selection, itinerary planning, and onboard experiences.",
    price: 3000,
    priceUnit: "day",
    location: "Mediterranean, Caribbean",
    rating: 4.7,
    reviews: 29,
    images: ["/placeholder.svg?height=800&width=1200"],
    amenities: ["staff", "security"],
    categoryType: "concierge",
  },
  {
    id: "private-tours",
    title: "Private Cultural Tours",
    description: "Exclusive access to museums, historical sites, and cultural experiences with expert guides.",
    price: 1200,
    priceUnit: "day",
    location: "Europe, Asia",
    rating: 4.8,
    reviews: 45,
    images: ["/placeholder.svg?height=800&width=1200"],
    amenities: ["staff"],
    categoryType: "concierge",
  },
  {
    id: "wellness-retreat",
    title: "Wellness Retreat Planning",
    description: "Curated wellness experiences including spa treatments, fitness programs, and mindfulness activities.",
    price: 2500,
    priceUnit: "day",
    location: "Bali, Maldives, Switzerland",
    rating: 4.9,
    reviews: 38,
    images: ["/placeholder.svg?height=800&width=1200"],
    amenities: ["staff"],
    categoryType: "concierge",
  },
]

export default function ConciergePage() {
  const { t } = useLanguage()
  const [filteredServices, setFilteredServices] = useState<CategoryItemProps[]>(conciergeData)
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    amenities: [] as string[],
    locations: [] as string[],
    sortBy: "recommended",
  })

  useEffect(() => {
    let filtered = [...conciergeData]

    // Filter by price
    filtered = filtered.filter(
      (service) => service.price >= filters.priceRange[0] && service.price <= filters.priceRange[1],
    )

    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((service) => filters.amenities.every((amenity) => service.amenities.includes(amenity)))
    }

    // Filter by location
    if (filters.locations.length > 0) {
      filtered = filtered.filter((service) => filters.locations.some((loc) => service.location.includes(loc)))
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Keep default order (recommended)
        break
    }

    setFilteredServices(filtered)
  }, [filters])

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] w-full">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt={t("category.concierge")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t("category.concierge")}</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl mx-auto">
              Exclusive concierge services tailored to your every need and desire.
            </p>
          </div>
        </div>
      </section>

      {/* Concierge Content */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filter */}
            <div className="lg:w-1/4">
              <CategoryFilter categoryType="concierge" onFilterChange={handleFilterChange} />
            </div>

            {/* Concierge Grid */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">{t("category.concierge")}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {filteredServices.length} {t("category.results")}
                </p>
              </div>

              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <CategoryItem key={service.id} {...service} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t("category.noResults")}</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        priceRange: [0, 10000],
                        amenities: [],
                        locations: [],
                        sortBy: "recommended",
                      })
                    }
                  >
                    {t("category.reset")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  )
}