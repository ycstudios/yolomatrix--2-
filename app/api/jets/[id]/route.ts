import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const jet = await prisma.jet.findUnique({
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

    if (!jet) {
      return NextResponse.json({ error: "Jet not found" }, { status: 404 })
    }

    return NextResponse.json(jet)
  } catch (error) {
    console.error("Error fetching jet:", error)
    return NextResponse.json({ error: "Failed to fetch jet" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jet = await prisma.jet.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!jet) {
      return NextResponse.json({ error: "Jet not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (jet.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await req.json()

    const updatedJet = await prisma.jet.update({
      where: {
        id: params.id,
      },
      data,
    })

    return NextResponse.json(updatedJet)
  } catch (error) {
    console.error("Error updating jet:", error)
    return NextResponse.json({ error: "Failed to update jet" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jet = await prisma.jet.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!jet) {
      return NextResponse.json({ error: "Jet not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (jet.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.jet.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting jet:", error)
    return NextResponse.json({ error: "Failed to delete jet" }, { status: 500 })
  }
}
