import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Por ahora solo logging, en producción aquí iría la autenticación y autorización
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    // Aquí puedes añadir lógica de autenticación
    console.log("Admin access attempt:", pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
