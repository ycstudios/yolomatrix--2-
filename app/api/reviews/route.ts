import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const listingId = searchParams.get("listingId")
    const listingType = searchParams.get("listingType")

    if (!listingId || !listingType) {
      return NextResponse.json({ error: "Missing listingId or listingType" }, { status: 400 })
    }

    // Construct the query based on the listing type
    const whereClause: any = {}

    switch (listingType) {
      case "cars":
        whereClause.carId = listingId
        break
      case "jets":
        whereClause.jetId = listingId
        break
      case "yachts":
        whereClause.yachtId = listingId
        break
      case "mansions":
        whereClause.mansionId = listingId
        break
      case "apartments":
        whereClause.apartmentId = listingId
        break
      default:
        return NextResponse.json({ error: "Invalid listing type" }, { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const { listingId, listingType, rating, comment } = data

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
      return NextResponse.json({ error: "You have already reviewed this listing" }, { status: 400 })
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

    const review = await prisma.review.create({
      data: reviewData,
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
