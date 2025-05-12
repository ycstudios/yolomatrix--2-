import type { User } from "@prisma/client"

// Extend the built-in Session type
declare module "next-auth" {
  interface Session {
    user: User & {
      id: string
      role: string
    }
  }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
  }
}

export type Category = "cars" | "jets" | "yachts" | "mansions" | "apartments"

export interface ListingBase {
  id: string
  title: string
  description: string
  price: number
  location: string
  images: string[]
  featured: boolean
  available: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface Car extends ListingBase {
  make: string
  model: string
  year: number
  color: string
  transmission: string
  fuelType: string
  seats: number
}

export interface Jet extends ListingBase {
  model: string
  manufacturer: string
  year: number
  range: number
  maxSpeed: number
  maxPassengers: number
}

export interface Yacht extends ListingBase {
  length: number
  cabins: number
  crew: number
  year: number
  manufacturer: string
}

export interface Mansion extends ListingBase {
  bedrooms: number
  bathrooms: number
  area: number
  amenities: string[]
}

export interface Apartment extends ListingBase {
  bedrooms: number
  bathrooms: number
  area: number
  floor: number
  amenities: string[]
}

export interface Booking {
  id: string
  startDate: Date
  endDate: Date
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  userId: string
  listingId: string
  listingType: Category
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  rating: number
  comment: string
  userId: string
  listingId: string
  listingType: Category
  createdAt: Date
  updatedAt: Date
}
