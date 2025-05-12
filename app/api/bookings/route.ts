import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
        ...(status ? { status } : {}),
      },
      include: {
        car: true,
        jet: true,
        yacht: true,
        mansion: true,
        apartment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const { listingId, listingType, startDate, endDate, totalPrice } = data

    // Validate that the listing exists
    let listing

    switch (listingType) {
      case "cars":
        listing = await prisma.car.findUnique({
          where: { id: listingId },
        })
        break
      case "jets":
        listing = await prisma.jet.findUnique({
          where: { id: listingId },
        })
        break
      case "yachts":
        listing = await prisma.yacht.findUnique({
          where: { id: listingId },
        })
        break
      case "mansions":
        listing = await prisma.mansion.findUnique({
          where: { id: listingId },
        })
        break
      case "apartments":
        listing = await prisma.apartment.findUnique({
          where: { id: listingId },
        })
        break
      default:
        return NextResponse.json({ error: "Invalid listing type" }, { status: 400 })
    }

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // Check if the listing is available
    if (!listing.available) {
      return NextResponse.json({ error: "Listing is not available for booking" }, { status: 400 })
    }

    // Create the booking with the appropriate relation
    const bookingData: any = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
      status: "pending",
      userId: session.user.id,
    }

    // Add the appropriate relation
    switch (listingType) {
      case "cars":
        bookingData.carId = listingId
        break
      case "jets":
        bookingData.jetId = listingId
        break
      case "yachts":
        bookingData.yachtId = listingId
        break
      case "mansions":
        bookingData.mansionId = listingId
        break
      case "apartments":
        bookingData.apartmentId = listingId
        break
    }

    const booking = await prisma.booking.create({
      data: bookingData,
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
