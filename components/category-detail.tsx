"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Star,
  Wifi,
  Bath,
  Car,
  Coffee,
  Utensils,
  Tv,
  Wind,
  Waves,
  Snowflake,
  Key,
  ParkingCircle,
  ShowerHead,
  Dumbbell,
  Music,
  Wine,
  Shield,
  Users,
  Plane,
  Building,
  GlassWater,
  CircleDot
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

// Map amenity keys to their corresponding icons
const amenityIcons: Record<string, any> = {
  // Original mappings
  wifi: Wifi,
  "private-bathroom": Bath,
  "valet-parking": Car,
  "coffee-maker": Coffee,
  "full-kitchen": Utensils,
  "smart-tv": Tv,
  "swimming-pool": Waves,
  "air-conditioning": Wind,
  "heating": Snowflake,
  "private-entrance": Key,
  "free-parking": ParkingCircle,
  "rain-shower": ShowerHead,
  "fitness-center": Dumbbell,
  "sound-system": Music,
  "wine-cellar": Wine,
  
  // Your new amenities
  "pool": Waves,
  "spa": Bath,
  "gym": Dumbbell,
  "parking": ParkingCircle,
  "ac": Wind,
  "kitchen": Utensils,
  "staff": Users,
  "security": Shield,
  "helipad": Plane,
  "bar": GlassWater  // Added bar amenity with GlassWater icon
}

// Feature icon mapping
const featureIcons: Record<string, any> = {
  // Add mappings for your feature names - adjust as needed
  "luxury": Star,
  "panoramic": Building,
  "privacy": Shield,
  "butler": Users,
  "chef": Utensils,
  "pool": Star,
  "beach": GlassWater,
  "transport": Car,
  "security": Shield,
  "cleaning": Bath,
  // Add more mappings as needed
}

// Helper function to get feature icon
const getFeatureIcon = (featureName: string) => {
  // Extract the feature key (first word in lowercase)
  const featureKey = featureName.split(' ')[0].toLowerCase();
  const IconComponent = featureIcons[featureKey] || CircleDot;
  return IconComponent;
}

const LaurelRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
      {/* Rating with laurels */}
      <div className="flex items-center justify-center gap-2 relative">
        {/* Left Laurel */}
        <div className="w-12 h-12 flex items-center justify-center">
          <img
            src="/images/star_img/right_side.avif"
            alt="Left laurel wreath"
            className="h-full transform -scale-x-100 drop-shadow-md"
          />
        </div>

        {/* Rating */}
        <span className="text-6xl font-extrabold leading-none text-gray-900 dark:text-white">
          {rating.toFixed(1)}
        </span>

        {/* Right Laurel */}
        <div className="w-12 h-12 flex items-center justify-center">
          <img
            src="/images/star_img/right_side.avif"
            alt="Right laurel wreath"
            className="h-full drop-shadow-md"
          />
        </div>
      </div>

      {/* Subtitle */}
      <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">Guest favourite</h2>

      {/* Description */}
      <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-xs text-sm">
        This home is in the <span className="font-semibold text-gray-900 dark:text-white">top 5%</span> of eligible listings based on ratings, reviews, and reliability.
      </p>
    </div>
  );
};

interface CategoryDetailProps {
  id: string
  title: string
  description: string
  longDescription?: string
  price: number
  priceUnit: "night" | "day" | "week"
  location: string
  rating: number
  reviews: number
  images: string[]
  amenities: string[]
  features?: string[]  // Note: We'll treat these as strings but add icons dynamically
  specifications?: Record<string, string>
  categoryType: "mansions" | "apartments" | "yachts" | "jets" | "cars" | "concierge"
}

export default function CategoryDetail({
  id,
  title,
  description,
  longDescription,
  price,
  priceUnit,
  location,
  rating,
  reviews,
  images,
  amenities,
  features,
  specifications,
  categoryType,
}: CategoryDetailProps) {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getPriceUnit = () => {
    switch (priceUnit) {
      case "night":
        return t("category.perNight")
      case "day":
        return t("category.perDay")
      case "week":
        return t("category.perWeek")
      default:
        return t("category.perNight")
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Helper function to get the icon for a specific amenity
  const getAmenityIcon = (amenity: string) => {
    const IconComponent = amenityIcons[amenity] || CircleDot;
    return <IconComponent className="h-5 w-5 text-blue-500" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:w-2/3">
          {/* Image Gallery */}
          <div className="relative rounded-xl overflow-hidden h-[400px] md:h-[500px] mb-6">
            <Image src={images[currentImageIndex] || "/placeholder.svg"} alt={title} fill className="object-cover" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-2 mb-8">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative h-20 rounded-lg overflow-hidden cursor-pointer ${
                  index === currentImageIndex ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${title} - image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">{longDescription || description}</p>
                {features && features.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold mt-4 mb-2">Features</h3>
                    <ul className="list-none pl-0 space-y-2">
                      {features.map((feature, index) => {
                        const FeatureIcon = getFeatureIcon(feature);
                        return (
                          <li key={index} className="text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                            <FeatureIcon className="w-5 h-5 text-blue-500" />
                            <span>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="amenities" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700 dark:text-gray-300">{t(`amenity.${amenity}`)}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              {specifications ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-medium">{key}</span>
                      <span className="text-gray-700 dark:text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No specifications available.</p>
              )}
            </TabsContent>
          </Tabs>

          {/* Location */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Location</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">{location}</p>
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Reviews</h3>
            
            {/* Custom Laurel Rating Component - Exactly like the image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6 text-center">
              <LaurelRating rating={rating} />
            </div>
            
            <div className="flex items-center mb-6">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-2 font-medium">
                {rating.toFixed(1)} · {reviews} reviews
              </span>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div>
                        <p className="font-medium">Guest {index + 1}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {format(new Date(2023, 5 - index, 15), "MMMM yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium">{5 - index * 0.1}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam
                    ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Things to Know Section */}
          <div className="mb-8 border-t-2 p-3">
            <h3 className="text-2xl font-bold mb-6">You must to know</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* House rules */}
              <div>
                <h4 className="text-lg font-semibold mb-4">House rules</h4>
                <ul className="space-y-3">
                  <li className="text-gray-700 dark:text-gray-300">Check-in after 2:00 pm</li>
                  <li className="text-gray-700 dark:text-gray-300">Checkout before 10:00 am</li>
                  <li className="text-gray-700 dark:text-gray-300">12 guests maximum</li>
                </ul>
              </div>

              {/* Safety & property */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Safety & property</h4>
                <ul className="space-y-3">
                  <li className="text-gray-700 dark:text-gray-300">Carbon monoxide alarm not reported</li>
                  <li className="text-gray-700 dark:text-gray-300">Smoke alarm not reported</li>
                  <li className="text-gray-700 dark:text-gray-300">Exterior security cameras on property</li>
                </ul>
              </div>

              {/* Cancellation policy */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Cancellation policy</h4>
                <ul className="space-y-3">
                  <li className="text-gray-700 dark:text-gray-300">Free cancellation before 2:00 pm on 12 Apr.</li>
                  <li className="text-gray-700 dark:text-gray-300">Cancel before check-in on 13 Apr for a partial refund.</li>
                </ul>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Review this Host's full policy for details.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking and Info */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sticky top-24">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{location}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {amenities.slice(0, 4).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="bg-gray-100 dark:bg-gray-800 font-normal flex items-center gap-1">
                    {getAmenityIcon(amenity)}
                    <span>{t(`amenity.${amenity}`)}</span>
                  </Badge>
                ))}
                {amenities.length > 4 && (
                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 font-normal">
                    +{amenities.length - 4}
                  </Badge>
                )}
              </div>
            </div>

            <div className="border-t border-b py-4 mb-4">
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold">{formatPrice(price)}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">{getPriceUnit()}</span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Dates</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date.from && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      "Select date range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Booking Button */}
            <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-4">
              {t("category.bookNow")}
            </Button>

            {/* Contact Button */}
            <Button variant="outline" className="w-full rounded-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Concierge
            </Button>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-2">Price Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatPrice(price)} x{" "}
                    {date.from && date.to
                      ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
                      : 1}{" "}
                    {priceUnit}s
                  </span>
                  <span>
                    {formatPrice(
                      price *
                        (date.from && date.to
                          ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
                          : 1),
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Service fee</span>
                  <span>{formatPrice(price * 0.1)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>
                    {formatPrice(
                      price *
                        (date.from && date.to
                          ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
                          : 1) +
                        price * 0.1,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}