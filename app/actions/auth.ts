"use server"

import { hash } from "bcrypt"
import { redirect } from "next/navigation"
import { z } from "zod"
import prisma from "@/lib/db"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function registerUser(formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return {
        error: {
          email: ["Email already in use"],
        },
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    redirect("/login")
  } catch (error) {
    console.error("Registration error:", error)
    return {
      error: {
        _form: ["Something went wrong. Please try again."],
      },
    }
  }
}

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function forgotPassword(formData: FormData) {
  const validatedFields = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email } = validatedFields.data

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      // Don't reveal that the user doesn't exist
      return {
        success: true,
      }
    }

    // In a real application, you would send a password reset email here
    // For this example, we'll just return success

    return {
      success: true,
    }
  } catch (error) {
    console.error("Forgot password error:", error)
    return {
      error: {
        _form: ["Something went wrong. Please try again."],
      },
    }
  }
}
