import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the session cookie
  const session = request.cookies.get("appwrite-session")

  // Check if the user is trying to access protected routes without a session
  if (!session && !request.nextUrl.pathname.startsWith("/login")) {
    // Redirect to login page
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If the user is already logged in and trying to access login page, redirect to home
  if (session && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Configure which paths should be processed by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

