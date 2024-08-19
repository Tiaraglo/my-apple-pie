import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayloadJose } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const url = request.url;
  const path = request.nextUrl.pathname;

  if (path.includes("wishlist")) {
    const cookieToken = cookies().get("token");

    if (!cookieToken) {
      return NextResponse.redirect(new URL("/login", url));
    }

    const token = cookieToken.value;
    type TokenPayloadType = {
      id: string;
      email: string;
    };

    try {
      const decodedToken = await readPayloadJose<TokenPayloadType>(token);
      console.log(token, "ini tokennya");

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", decodedToken.id);
      requestHeaders.set("x-user-email", decodedToken.email);

      return NextResponse.next({
        headers: requestHeaders,
      });
    } catch (error) {
      return NextResponse.redirect(new URL("/login", url));
    }
  }

  return NextResponse.next();
}
