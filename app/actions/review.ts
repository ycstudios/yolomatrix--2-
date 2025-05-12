"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import type { Category } from "@/lib/types"

const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(1, "Comment is required"),
  listingId: z.string().min(1, "Listing ID is required"),
  listingType: z.enum(["cars", "jets", "yachts", "mansions", "apartments"]),
})

export async function createReview(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const validatedFields = reviewSchema.safeParse({
    rating: formData.get("rating"),
    comment: formData.get("comment"),
    listingId: formData.get("listingId"),
    listingType: formData.get("listingType"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { rating, comment, listingId, listingType } = validatedFields.data

  try {
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
    }

    if (!listing) {
      return {
        error: {
          _form: ["Listing not found"],
        },
      }
    }

    // Check if user has already reviewed this listing
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        OR: [
          { carId: listingType === "cars" ? listingId : undefined },
          { jetId: listingType === "jets" ? listingId : undefined },
          { yachtId: listingType === "yachts" ? listingId : undefined },
          { mansionId: listingType === "mansions" ? listingId : undefined },
          { apartmentId: listingType === "apartments" ? listingId : undefined },
        ],
      },
    })

    if (existingReview) {
      return {
        error: {
          _form: ["You have already reviewed this listing"],
        },
      }
    }

    // Create the review with the appropriate relation
    const reviewData: any = {
      rating,
      comment,
      userId: session.user.id,
    }

    // Add the appropriate relation
    switch (listingType) {
      case "cars":
        reviewData.carId = listingId
        break
      case "jets":
        reviewData.jetId = listingId
        break
      case "yachts":
        reviewData.yachtId = listingId
        break
      case "mansions":
        reviewData.mansionId = listingId
        break
      case "apartments":
        reviewData.apartmentId = listingId
        break
    }

    await prisma.review.create({
      data: reviewData,
    })

    revalidatePath(`/${listingType}/${listingId}`)
    return { success: true }
  } catch (error) {
    console.error("Review error:", error)
    return {
      error: {
        _form: ["Something went wrong. Please try again."],
      },
    }
  }
}

export async function deleteReview(reviewId: string, listingType: Category, listingId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  try {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    })

    if (!review) {
      return {
        error: "Review not found",
      }
    }

    // Check if user is owner or admin
    if (review.userId !== session.user.id && session.user.role !== "admin") {
      return {
        error: "You are not authorized to delete this review",
      }
    }

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    })

    revalidatePath(`/${listingType}/${listingId}`)
    return { success: true }
  } catch (error) {
    console.error("Delete review error:", error)
    return {
      error: "Something went wrong. Please try again.",
    }
  }
}
