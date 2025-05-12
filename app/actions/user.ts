"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { z } from "zod"
import { hash, compare } from "bcrypt"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const validatedFields = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email } = validatedFields.data

  try {
    // Check if email is already in use by another user
    if (email !== session.user.email) {
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
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        email,
      },
    })

    revalidatePath("/user/profile")
    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return {
      error: {
        _form: ["Something went wrong. Please try again."],
      },
    }
  }
}

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export async function changePassword(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const validatedFields = passwordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { currentPassword, newPassword } = validatedFields.data

  try {
    // Get user with password
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        password: true,
      },
    })

    if (!user) {
      return {
        error: {
          _form: ["User not found"],
        },
      }
    }

    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.password)

    if (!isPasswordValid) {
      return {
        error: {
          currentPassword: ["Current password is incorrect"],
        },
      }
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashedPassword,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Change password error:", error)
    return {
      error: {
        _form: ["Something went wrong. Please try again."],
      },
    }
  }
}
