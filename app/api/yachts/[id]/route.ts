import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const yacht = await prisma.yacht.findUnique({
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

    if (!yacht) {
      return NextResponse.json({ error: "Yacht not found" }, { status: 404 })
    }

    return NextResponse.json(yacht)
  } catch (error) {
    console.error("Error fetching yacht:", error)
    return NextResponse.json({ error: "Failed to fetch yacht" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const yacht = await prisma.yacht.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!yacht) {
      return NextResponse.json({ error: "Yacht not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (yacht.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await req.json()

    const updatedYacht = await prisma.yacht.update({
      where: {
        id: params.id,
      },
      data,
    })

    return NextResponse.json(updatedYacht)
  } catch (error) {
    console.error("Error updating yacht:", error)
    return NextResponse.json({ error: "Failed to update yacht" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const yacht = await prisma.yacht.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!yacht) {
      return NextResponse.json({ error: "Yacht not found" }, { status: 404 })
    }

    // Check if user is owner or admin
    if (yacht.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.yacht.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting yacht:", error)
    return NextResponse.json({ error: "Failed to delete yacht" }, { status: 500 })
  }
}
