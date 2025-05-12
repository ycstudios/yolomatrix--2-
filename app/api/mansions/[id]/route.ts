import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const mansion = await prisma.mansion.findUnique({
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

    if (!mansion) {
      return NextResponse.json({ error: "Mansion not found" }, { status: 404 })
    }

    return NextResponse.json(mansion)
  } catch (error) {
    console.error("Error fetching mansion:", error)
    return NextResponse.json({ error: "Failed to fetch mansion" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const mansion = await prisma.mansion.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!mansion) {
      return NextResponse.json({ error: "Mansion not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (mansion.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await req.json()

    const updatedMansion = await prisma.mansion.update({
      where: {
        id: params.id,
      },
      data,
    })

    return NextResponse.json(updatedMansion)
  } catch (error) {
    console.error("Error updating mansion:", error)
    return NextResponse.json({ error: "Failed to update mansion" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const mansion = await prisma.mansion.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!mansion) {
      return NextResponse.json({ error: "Mansion not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (mansion.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.mansion.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting mansion:", error)
    return NextResponse.json({ error: "Failed to delete mansion" }, { status: 500 })
  }
}
