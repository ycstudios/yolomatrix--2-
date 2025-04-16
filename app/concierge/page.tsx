"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MessageSquare, ChevronRight, Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSpring, animated } from "react-spring"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"
import { useLanguage } from "@/contexts/language-context"
import CategoryFilter from "@/components/category-filter"
import CategoryItem from "@/components/category-item"
import { mansionsData } from "../mansions/page"
import { jetsData } from "../jets/page"
import { conciergeData } from "../concierge/page"
import { apartmentsData } from "../apartments/page"
import { yachtsData } from "../yachts/page"
import { carsData} from "../cars/page"

// Define the rental category data structure
const rentalCategories = [
  {
    id: "mansions",
    title: "Luxury Mansions",
    description:
      "Experience unparalleled luxury in our exclusive collection of mansions around the world. From beachfront villas to mountain retreats, our collection includes some of the most prestigious properties available for short-term rental.",
    heroImage: "/images/mansions_img/Mansions_hero1.jpeg",
    heroVideo: "/Video/luxury-mansions.mp4",
    items: mansionsData,
    filters: {
      priceRange: [0, 50000],
      amenities: [] as string[],
      locations: [] as string[],
      sortBy: "recommended",
    }
  },
  {
    id: "apartments",
    title: "Premium Apartments",
    description:
      "Discover our collection of luxury apartments in the world's most desirable locations. From Manhattan penthouses to Parisian pieds-à-terre, our apartments offer the perfect blend of comfort, style, and convenience.",
    heroImage: "/images/Apartments_img/apartments_hero.jpg",
    heroVideo: "/Video/luxury-Apartments.mp4",
    items: apartmentsData,
    filters: {
      priceRange: [0, 10000],
      amenities: [] as string[],
      locations: [] as string[],
      sortBy: "recommended",
    }
  },
  {
    id: "jets",
    title: "Private Jets",
    description:
      "Experience the pinnacle of air travel with our exclusive private jet collection. From mid-size jets to ultra-long-range aircraft, our fleet offers unparalleled comfort, privacy, and flexibility for your travel needs.",
    heroImage: "/images/rental_hero.webp",
    heroVideo: "/Video//luxury-jets.mp4",
    items: jetsData,
    filters: {
      priceRange: [0, 50000],
      amenities: [] as string[],
      locations: [] as string[],
      sortBy: "recommended",
    }
  },
  {
    id: "cars",
    title: "Exotic Cars",
    description:
      "Drive in style with our collection of exotic and luxury vehicles. From Italian supercars to British grand tourers, our fleet features the most coveted automobiles from prestigious manufacturers worldwide.",
    heroImage: "/images/rental_hero.webp",
    heroVideo: "/Video/luxury-cars.mp4",
    items: carsData,
    filters: {
      priceRange: [0, 5000],
      amenities: [] as string[],
      locations: [] as string[],
      sortBy: "recommended",
    }
  },
  {
    id: "yachts",
    title: "Superyachts",
    description:
      "Set sail in ultimate luxury with our exclusive collection of superyachts. From sleek motor yachts to classic sailing vessels, our fleet offers the perfect vessel for exploring the world's most beautiful coastlines.",
    heroImage: "/images/rental_hero.webp",
    heroVideo: "/Video/luxury-yachts.mp4",
    items: yachtsData,
    filters: {
      priceRange: [0, 100000],
      amenities: [] as string[],
      locations: [] as string[],
      sortBy: "recommended",
    }
  },
  {
    id: "concierge",
    title: "Concierge Services",
    description:
      "Elevate your experience with our premium concierge services. From event planning to personal shopping, our dedicated team is available 24/7 to fulfill your every request and create unforgettable memories.",
    heroImage: "/images/rental_hero.webp",
    heroVideo: "/Video/luxury-concierge.mp4\\",
    items: conciergeData,
    filters: {
      priceRange: [0, 10000],
      amenities: [] as string[],
      locations: [] as string[],
      sortBy: "recommended",
    }
  },
]


export default function RentalsPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("mansions")
  const [isLoaded, setIsLoaded] = useState(false)
  const [filteredItems, setFilteredItems] = useState(mansionsData)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    amenities: [] as string[],
    locations: [] as string[],
    sortBy: "recommended",
  })
  
  // Enhanced hero animation values based on scroll position - matching concierge page
  const [{ scale, blur, opacity, gradientOpacity, translateY }, setHeroSpring] = useSpring(() => ({
    scale: 1,
    blur: 0,
    opacity: 1,
    gradientOpacity: 0.6,
    translateY: 0,
    config: { mass: 1, tension: 280, friction: 60 }
  }))
  
  const heroRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Get the active category data
  const activeCategoryData = rentalCategories.find((cat) => cat.id === activeTab)

  // Handle client-side rendering check
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-play video when component mounts or when tab changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
        // Could add a play button here if autoplay is blocked
      });
    }
  }, [activeTab])

  // Enhanced scroll effect that matches the concierge page
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Calculate animation values based on scroll
      const heroHeight = heroRef.current?.offsetHeight || 0
      const scrollProgress = Math.min(currentScrollY / (heroHeight * 0.8), 1)
      
      // Set spring values for animations - matching concierge page
      setHeroSpring({
        scale: 1 + (scrollProgress * 0.3), // Max zoom 1.3x
        blur: scrollProgress * 2,
        opacity: 1 - (scrollProgress * 0.3),
        gradientOpacity: 0.6 + (scrollProgress * 0.2),
        translateY: currentScrollY * 0.2 // Parallax effect
      })
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient, setHeroSpring]);

  useEffect(() => {
    if (isClient) {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      checkMobile();
      window.addEventListener('resize', checkMobile);
  
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [isClient]);
  
  useEffect(() => {
    setIsLoaded(true)
    
    // Set the initial filters when changing tabs
    if (activeCategoryData) {
      setFilters(activeCategoryData.filters)
      setFilteredItems(activeCategoryData.items)
    }
  }, [activeTab])

  useEffect(() => {
    if (!activeCategoryData) return

    let filtered = [...activeCategoryData.items]

    // Filter by price
    filtered = filtered.filter(
      (item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1],
    )

    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((item) => 
        filters.amenities.every((amenity) => item.amenities?.includes(amenity))
      )
    }

    // Filter by location
    if (filters.locations.length > 0) {
      filtered = filtered.filter((item) => 
        filters.locations.some((loc) => item.location?.includes(loc))
      )
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

    setFilteredItems(filtered)
  }, [filters, activeTab])

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    if (isClient && window.innerWidth < 1024) {
      setShowMobileFilters(false) // Close mobile filters after applying
    }
  }

  // Function to toggle mobile filters drawer
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters)
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  // Select a category and close dropdown on mobile
  const selectCategory = (categoryId: string) => {
    setActiveTab(categoryId)
    setShowMobileMenu(false)
  }

  // Text animation variants for staggered animation - matching concierge page
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  }

  return (
    <main className="min-h-screen pt-0">
      {/* Enhanced Hero Banner with Video Background */}
      <section ref={heroRef} className="relative h-[80vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <animated.div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            transform: scale.to(s => `scale(${s})`),
            filter: blur.to(b => `blur(${b}px)`),
          }}
        >
          {/* Video Background */}
          {activeCategoryData?.heroVideo ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={activeCategoryData.heroVideo} type="video/mp4" />
              {/* Fallback image in case video doesn't load */}
              <Image
                src={activeCategoryData.heroImage}
                alt={activeCategoryData.title}
                fill
                className="object-cover"
                priority
              />
            </video>
          ) : (
            <Image
              src={activeCategoryData?.heroImage || "/images/rental_hero.webp"}
              alt={activeCategoryData?.title || "Luxury Rentals"}
              fill
              className="object-cover"
              priority
            />
          )}
        </animated.div>
        
        <animated.div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"
          style={{
            opacity: gradientOpacity
          }}
        />
        
        <animated.div 
          className="absolute inset-0 flex items-center justify-center text-center px-4"
          style={{
            opacity,
            transform: translateY.to(y => `translateY(${y}px)`)
          }}
        >
          <div className="max-w-4xl">
            <motion.h1 
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg"
            >
              {activeCategoryData?.title || "Luxury Rentals"}
            </motion.h1>
            
            <motion.p 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-4 sm:mb-6 max-w-3xl mx-auto drop-shadow-md"
            >
              {activeCategoryData?.description || "Discover our exclusive collection of premium rentals"}
            </motion.p>
            
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-all"
              >
                Explore Now
              </Button>
            </motion.div>
          </div>
        </animated.div>
      </section>

      {/* Responsive Tab Navigation */}
      <section className="bg-white dark:bg-black py-4 sm:py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-2 sm:px-4">
          {/* Mobile Dropdown Menu */}
          <div className="sm:hidden">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between"
              onClick={toggleMobileMenu}
            >
              <span>{activeCategoryData?.title || "Select Category"}</span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 ${showMobileMenu ? 'rotate-180' : ''}`} 
              />
            </Button>
            
            <AnimatePresence>
              {showMobileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-30 mt-2 w-[calc(100%-2rem)] mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {rentalCategories.map((category) => (
                    <div 
                      key={category.id}
                      className={`p-3 cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between ${
                        activeTab === category.id ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => selectCategory(category.id)}
                    >
                      <span className={activeTab === category.id ? 'font-medium text-blue-600 dark:text-blue-400' : ''}>
                        {category.title}
                      </span>
                      {activeTab === category.id && <ChevronRight size={16} className="text-blue-600 dark:text-blue-400" />}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Original Desktop Tabs */}
          <div className="hidden sm:block">
            <Tabs defaultValue="mansions" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex flex-nowrap justify-center mb-0 bg-transparent overflow-visible">
                {rentalCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full data-[state=active]:shadow-lg transition-all duration-300 m-1 whitespace-nowrap text-sm sm:text-base"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile Filter Toggle Button */}
              <div className="lg:hidden flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{activeCategoryData?.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {filteredItems.length} {t("category.results")}
                  </p>
                </div>
                <Button 
                  onClick={toggleMobileFilters} 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {showMobileFilters ? <X size={16} /> : <Menu size={16} />}
                  <span>{showMobileFilters ? "Close" : "Filters"}</span>
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Sidebar Filter - Responsive Drawer on Mobile */}
                <AnimatePresence>
                  {(showMobileFilters || (isClient && window.innerWidth >= 1024)) && (
                    <motion.div
                      className={`${
                        showMobileFilters 
                          ? "fixed inset-0 z-50 bg-white dark:bg-black p-4 overflow-y-auto" 
                          : "hidden lg:block lg:w-1/4"
                      }`}
                      initial={{ x: showMobileFilters ? "-100%" : 0, opacity: showMobileFilters ? 0 : 1 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: showMobileFilters ? "-100%" : 0, opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                      {showMobileFilters && (
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold">Filters</h3>
                          <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                            <X size={24} />
                          </Button>
                        </div>
                      )}
                      <CategoryFilter 
                        categoryType={activeTab} 
                        onFilterChange={handleFilterChange}
                        initialFilters={filters}
                      />
                      {showMobileFilters && (
                        <div className="mt-4 sticky bottom-0 bg-white dark:bg-black py-4 border-t border-gray-200 dark:border-gray-800">
                          <Button 
                            className="w-full"
                            onClick={() => setShowMobileFilters(false)}
                          >
                            Show {filteredItems.length} Results
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Items Grid */}
                <div className="lg:w-3/4">
                  <div className="hidden lg:block mb-6">
                    <h2 className="text-2xl font-bold">{activeCategoryData?.title}</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {filteredItems.length} {t("category.results")}
                    </p>
                  </div>

                  {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {filteredItems.map((item, index) => (
                        <motion.div 
                          key={item.id} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: index * 0.1,
                            duration: 0.5,
                            ease: "easeOut"
                          }}
                          className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          <CategoryItem {...item} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 sm:p-8 text-center">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{t("category.noResults")}</p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (activeCategoryData) {
                            setFilters(activeCategoryData.filters)
                          }
                        }}
                      >
                        {t("category.reset")}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  )
}