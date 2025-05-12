import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const apartment = await prisma.apartment.findUnique({
      where: {
        id: params.id,
      },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    if (!apartment) {
      return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
    }

    return NextResponse.json(apartment)
  } catch (error) {
    console.error("Error fetching apartment:", error)
    return NextResponse.json({ error: "Failed to fetch apartment" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const apartment = await prisma.apartment.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!apartment) {
      return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (apartment.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await req.json()

    const updatedApartment = await prisma.apartment.update({
      where: {
        id: params.id,
      },
      data,
    })

    return NextResponse.json(updatedApartment)
  } catch (error) {
    console.error("Error updating apartment:", error)
    return NextResponse.json({ error: "Failed to update apartment" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const apartment = await prisma.apartment.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!apartment) {
      return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (apartment.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.apartment.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting apartment:", error)
    return NextResponse.json({ error: "Failed to delete apartment" }, { status: 500 })
  }
}
