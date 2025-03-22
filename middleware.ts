/////////////////////////////////////////////////////////////////////// will fix laterrrrr
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies(); // No need for await
  const token = cookieStore.get("access_token")?.value;

  const protectedRoutes = ["/dashboard", "/music", "/artists"];
  const authRoutes = ["/auth/login", "/auth/signup"];

  const pathname = req.nextUrl.pathname;

  // Allow public access to authentication routes
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Restrict access to protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to relevant routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/music/:path*",
    "/artists/:path*",
    "/auth/:path*",
  ],
};
