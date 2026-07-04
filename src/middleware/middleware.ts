import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;

  // Allow the login page
  if (nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect every other admin page
  if (nextUrl.pathname.startsWith("/admin") && !req.auth) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
