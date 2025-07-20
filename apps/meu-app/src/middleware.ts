import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/transactions",
    "/add-money",
    "/loan",
    "/new-transaction",
    "/send-pix",
    "/send-TED",
  ];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const isAuthenticated = request.cookies.get("access_token")?.value;

    if (isAuthenticated === undefined || !isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}
