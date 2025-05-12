import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const car = await prisma.car.findUnique({
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

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 })
    }

    return NextResponse.json(car)
  } catch (error) {
    console.error("Error fetching car:", error)
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const car = await prisma.car.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (car.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await req.json()

    const updatedCar = await prisma.car.update({
      where: {
        id: params.id,
      },
      data,
    })

    return NextResponse.json(updatedCar)
  } catch (error) {
    console.error("Error updating car:", error)
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const car = await prisma.car.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (car.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.car.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting car:", error)
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 })
  }
}
