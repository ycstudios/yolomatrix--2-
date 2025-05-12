import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@yolomatrix.com" },
    update: {},
    create: {
      email: "admin@yolomatrix.com",
      name: "Admin User",
      password: adminPassword,
      role: "admin",
    },
  })

  // Create regular user
  const userPassword = await hash("user123", 10)
  const user = await prisma.user.upsert({
    where: { email: "user@yolomatrix.com" },
    update: {},
    create: {
      email: "user@yolomatrix.com",
      name: "Regular User",
      password: userPassword,
      role: "user",
    },
  })

  console.log({ admin, user })

  // Create sample cars
  const car1 = await prisma.car.create({
    data: {
      title: "Luxury Ferrari 488",
      description: "Experience the thrill of driving a Ferrari 488 with its powerful V8 engine and sleek design.",
      price: 1200,
      location: "Miami, FL",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      make: "Ferrari",
      model: "488",
      year: 2022,
      color: "Red",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 2,
      userId: admin.id,
    },
  })

  const car2 = await prisma.car.create({
    data: {
      title: "Lamborghini Aventador",
      description: "Turn heads with this stunning Lamborghini Aventador, featuring a V12 engine and scissor doors.",
      price: 1500,
      location: "Los Angeles, CA",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      make: "Lamborghini",
      model: "Aventador",
      year: 2021,
      color: "Yellow",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 2,
      userId: admin.id,
    },
  })

  // Create sample jets
  const jet1 = await prisma.jet.create({
    data: {
      title: "Gulfstream G650",
      description:
        "Travel in ultimate luxury with this Gulfstream G650, featuring a spacious cabin and long range capabilities.",
      price: 15000,
      location: "New York, NY",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      model: "G650",
      manufacturer: "Gulfstream",
      year: 2020,
      range: 7000,
      maxSpeed: 610,
      maxPassengers: 19,
      userId: admin.id,
    },
  })

  const jet2 = await prisma.jet.create({
    data: {
      title: "Bombardier Global 7500",
      description:
        "Experience the pinnacle of private aviation with the Bombardier Global 7500, featuring four living spaces and exceptional range.",
      price: 18000,
      location: "Las Vegas, NV",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      model: "Global 7500",
      manufacturer: "Bombardier",
      year: 2021,
      range: 7700,
      maxSpeed: 590,
      maxPassengers: 19,
      userId: admin.id,
    },
  })

  // Create sample yachts
  const yacht1 = await prisma.yacht.create({
    data: {
      title: "Luxury Superyacht Azzam",
      description:
        "Cruise the seas in style with this magnificent superyacht featuring multiple decks, a swimming pool, and luxurious accommodations.",
      price: 50000,
      location: "Monaco",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      length: 180,
      cabins: 12,
      crew: 20,
      year: 2019,
      manufacturer: "Lürssen",
      userId: admin.id,
    },
  })

  const yacht2 = await prisma.yacht.create({
    data: {
      title: "Eclipse Megayacht",
      description:
        "One of the world's largest private yachts, featuring two helicopter pads, multiple swimming pools, and a submarine.",
      price: 75000,
      location: "Saint-Tropez, France",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      length: 162.5,
      cabins: 18,
      crew: 70,
      year: 2010,
      manufacturer: "Blohm+Voss",
      userId: admin.id,
    },
  })

  // Create sample mansions
  const mansion1 = await prisma.mansion.create({
    data: {
      title: "Beverly Hills Mega Mansion",
      description:
        "Experience the height of luxury in this stunning Beverly Hills mansion with panoramic views, infinity pool, and home theater.",
      price: 10000,
      location: "Beverly Hills, CA",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      bedrooms: 10,
      bathrooms: 12,
      area: 20000,
      amenities: ["Infinity Pool", "Home Theater", "Wine Cellar", "Gym", "Spa"],
      userId: admin.id,
    },
  })

  const mansion2 = await prisma.mansion.create({
    data: {
      title: "Miami Waterfront Estate",
      description: "Luxurious waterfront estate in Miami with private dock, tennis court, and stunning ocean views.",
      price: 8500,
      location: "Miami, FL",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      bedrooms: 8,
      bathrooms: 10,
      area: 15000,
      amenities: ["Private Dock", "Tennis Court", "Swimming Pool", "Home Gym", "Guest House"],
      userId: admin.id,
    },
  })

  // Create sample apartments
  const apartment1 = await prisma.apartment.create({
    data: {
      title: "Luxury Penthouse in Manhattan",
      description:
        "Stunning penthouse apartment with panoramic views of Manhattan, featuring high-end finishes and a private terrace.",
      price: 5000,
      location: "New York, NY",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      bedrooms: 3,
      bathrooms: 3.5,
      area: 3000,
      floor: 50,
      amenities: ["Private Terrace", "Concierge Service", "Gym", "Spa", "Wine Cellar"],
      userId: admin.id,
    },
  })

  const apartment2 = await prisma.apartment.create({
    data: {
      title: "Luxury Apartment in Downtown Dubai",
      description:
        "Elegant apartment in the heart of Dubai with stunning views of the Burj Khalifa and Dubai Fountain.",
      price: 3500,
      location: "Dubai, UAE",
      images: ["/placeholder.svg?height=500&width=800"],
      featured: true,
      available: true,
      bedrooms: 2,
      bathrooms: 2.5,
      area: 2200,
      floor: 40,
      amenities: ["Swimming Pool", "Gym", "Sauna", "Concierge Service", "Parking"],
      userId: admin.id,
    },
  })

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
