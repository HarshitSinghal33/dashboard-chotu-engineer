import { NextResponse, type NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

const allowedOrigins = [
  "https://www.chotuengineer.com",
];

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const requestOrigin = request.headers.get("origin");
  
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
      response.headers.set("Access-Control-Allow-Origin", requestOrigin);
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set("Access-Control-Max-Age", "86400");
    }
    return response;
  }

  if (pathname.startsWith("/api")) {
    const response = NextResponse.next();
    
    if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
      response.headers.set("Access-Control-Allow-Origin", requestOrigin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }
    
    return response;
  }

  const token = request.cookies.get("token")?.value;
  
  if (pathname.startsWith("/login")) {
    if (!token) return NextResponse.next();
    
    try {
      await verifyAuth(token);
      return NextResponse.redirect(new URL("/", origin));
    } catch (error) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  try {
    await verifyAuth(token);
    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL("/login", origin));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};