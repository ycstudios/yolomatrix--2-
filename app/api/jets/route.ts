import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const featured = searchParams.get("featured") === "true"
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    const jets = await prisma.jet.findMany({
      where: featured ? { featured: true } : {},
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(jets)
  } catch (error) {
    console.error("Error fetching jets:", error)
    return NextResponse.json({ error: "Failed to fetch jets" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const jet = await prisma.jet.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    })

    return NextResponse.json(jet, { status: 201 })
  } catch (error) {
    console.error("Error creating jet:", error)
    return NextResponse.json({ error: "Failed to create jet" }, { status: 500 })
  }
}
