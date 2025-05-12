import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const featured = searchParams.get("featured") === "true"
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    const cars = await prisma.car.findMany({
      where: featured ? { featured: true } : {},
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(cars)
  } catch (error) {
    console.error("Error fetching cars:", error)
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const car = await prisma.car.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    })

    return NextResponse.json(car, { status: 201 })
  } catch (error) {
    console.error("Error creating car:", error)
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 })
  }
}
