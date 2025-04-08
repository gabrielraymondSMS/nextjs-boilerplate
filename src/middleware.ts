import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  CheckIsAuthRoute,
  CheckIsPrivateRoute,
  CheckIsPublicRoute,
} from "./lib/utils/route";
import { USERS_MANAGEMENT, LOGIN } from "./lib/utils/constants";
// import jwt from "jsonwebtoken";
import { jwtVerify } from "jose"; // Menggunakan jose untuk verifikasi JWT

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (CheckIsPublicRoute(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  if (!token && CheckIsPrivateRoute(req.nextUrl.pathname)) {
    const absoluteURL = new URL(LOGIN, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      // const { payload, protectedHeader } = await jwtVerify(token, secret);

      //  await jwtDecrypt(token, secret);
      if (CheckIsAuthRoute(req.nextUrl.pathname)) {
        const absoluteURL = new URL(USERS_MANAGEMENT, req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
      }
      return NextResponse.next();
    } catch (error) {
      const absoluteURL = new URL(LOGIN, req.nextUrl.origin);
      const response = NextResponse.redirect(absoluteURL.toString());
      response.cookies.delete("token"); // Hapus cookie token
      return response;
    }
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/leads/:path*",
    "/login",
    "/register",
  ], // Protected & Auth Pages
};
