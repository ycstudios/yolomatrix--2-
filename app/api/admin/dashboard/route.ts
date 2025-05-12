import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get counts for all entities
    const [
      userCount,
      carCount,
      jetCount,
      yachtCount,
      mansionCount,
      apartmentCount,
      bookingCount,
      reviewCount,
      pendingBookingCount,
      confirmedBookingCount,
      cancelledBookingCount,
      completedBookingCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.car.count(),
      prisma.jet.count(),
      prisma.yacht.count(),
      prisma.mansion.count(),
      prisma.apartment.count(),
      prisma.booking.count(),
      prisma.review.count(),
      prisma.booking.count({ where: { status: "pending" } }),
      prisma.booking.count({ where: { status: "confirmed" } }),
      prisma.booking.count({ where: { status: "cancelled" } }),
      prisma.booking.count({ where: { status: "completed" } }),
    ])

    // Get recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        car: true,
        jet: true,
        yacht: true,
        mansion: true,
        apartment: true,
      },
    })

    // Get recent users
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      counts: {
        users: userCount,
        cars: carCount,
        jets: jetCount,
        yachts: yachtCount,
        mansions: mansionCount,
        apartments: apartmentCount,
        bookings: bookingCount,
        reviews: reviewCount,
        pendingBookings: pendingBookingCount,
        confirmedBookings: confirmedBookingCount,
        cancelledBookings: cancelledBookingCount,
        completedBookings: completedBookingCount,
      },
      recentBookings,
      recentUsers,
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
