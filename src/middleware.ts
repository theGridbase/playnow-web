import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export const middleware = async (req: any) => {
  const currentUser = await getToken({ req });

  if (
    currentUser &&
    (req.nextUrl.pathname.startsWith("/login-as") ||
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/change-password") ||
      req.nextUrl.pathname.startsWith("/forget-password") ||
      req.nextUrl.pathname.startsWith("/register") ||
      req.nextUrl.pathname === "/") // for now only
  ) {
    return NextResponse.redirect(new URL("/owner", req.url));
  }

  if (
    !currentUser &&
    (req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/owner"))
  ) {
    return NextResponse.redirect(new URL("/login-as", req.url));
  }

  // Pass the accessToken to headers
  const response = NextResponse.next();
  if (currentUser?.accessToken) {
    response.headers.set("Authorization", `Bearer ${currentUser.accessToken}`);
  }

  return response;
};

export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)']

};
