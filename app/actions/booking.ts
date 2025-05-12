"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

const bookingSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  listingId: z.string().min(1, "Listing ID is required"),
  listingType: z.enum(["cars", "jets", "yachts", "mansions", "apartments"]),
})

export async function createBooking(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const validatedFields = bookingSchema.safeParse({
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    listingId: formData.get("listingId"),
    listingType: formData.get("listingType"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { startDate, endDate, listingId, listingType } = validatedFields.data

  try {
    // Validate that the listing exists
    let listing
    let price = 0

    switch (listingType) {
      case "cars":
        listing = await prisma.car.findUnique({
          where: { id: listingId },
        })
        if (listing) price = listing.price
        break
      case "jets":
        listing = await prisma.jet.findUnique({
          where: { id: listingId },
        })
        if (listing) price = listing.price
        break
      case "yachts":
        listing = await prisma.yacht.findUnique({
          where: { id: listingId },
        })
        if (listing) price = listing.price
        break
      case "mansions":
        listing = await prisma.mansion.findUnique({
          where: { id: listingId },
        })
        if (listing) price = listing.price
        break
      case "apartments":
        listing = await prisma.apartment.findUnique({
          where: { id: listingId },
        })
        if (listing) price = listing.price
        break
    }

    if (!listing) {
      return {
        error: {
          _form: ["Listing not found"],
        },
      }
    }

    // Check if the listing is available
    if (!listing.available) {
      return {
        error: {
          _form: ["This listing is not available for booking"],
        },
      }
    }

    // Calculate total price
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    if (days < 1) {
      return {
        error: {
          _form: ["End date must be after start date"],
        },
      }
    }

    const totalPrice = price * days

    // Create the booking with the appropriate relation
    const bookingData: any = {
      startDate: start,
      endDate: end,
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

    revalidatePath(`/${listingType}/${listingId}`)
    redirect("/user/bookings")
  } catch (error) {
    console.error("Booking error:", error)
    return {
      error: {
        _form: ["Something went wrong. Please try again."],
      },
    }
  }
}

export async function cancelBooking(bookingId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    })

    if (!booking) {
      return {
        error: "Booking not found",
      }
    }

    // Check if user is owner
    if (booking.userId !== session.user.id && session.user.role !== "admin") {
      return {
        error: "You are not authorized to cancel this booking",
      }
    }

    // Check if booking can be cancelled
    if (booking.status !== "pending" && booking.status !== "confirmed") {
      return {
        error: "This booking cannot be cancelled",
      }
    }

    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "cancelled",
      },
    })

    revalidatePath("/user/bookings")
    return { success: true }
  } catch (error) {
    console.error("Cancel booking error:", error)
    return {
      error: "Something went wrong. Please try again.",
    }
  }
}
