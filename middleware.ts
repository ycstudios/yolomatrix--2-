import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token
  const isAdmin = token?.role === "admin"

  const { pathname } = request.nextUrl

  // Public routes accessible to all users
  const publicRoutes = ["/", "/login", "/signup", "/forgot-password", "/about", "/contact"]

  // Routes that require authentication
  const authRoutes = ["/user", "/bookings"]

  // Routes that require admin access
  const adminRoutes = ["/admin"]

  // Check if the path is a public API route
  const isPublicApiRoute =
    pathname.startsWith("/api/") &&
    (pathname === "/api/auth/signin" ||
      pathname === "/api/auth/signout" ||
      pathname === "/api/auth/session" ||
      pathname === "/api/auth/providers" ||
      pathname === "/api/auth/csrf" ||
      pathname === "/api/register")

  // Check if the path is an API route that requires authentication
  const isApiRoute = pathname.startsWith("/api/") && !isPublicApiRoute

  // Check if the path is an admin API route
  const isAdminApiRoute = pathname.startsWith("/api/admin")

  // Redirect authenticated users away from login/signup pages
  if (isAuthenticated && (pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Check if the user is trying to access a protected route without authentication
  if (!isAuthenticated && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Check if the user is trying to access an admin route without admin privileges
  if ((pathname.startsWith("/admin") || isAdminApiRoute) && !isAdmin) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Check if the user is trying to access a protected API route without authentication
  if (isApiRoute && !isPublicApiRoute && !isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if the user is trying to access an admin API route without admin privileges
  if (isAdminApiRoute && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
