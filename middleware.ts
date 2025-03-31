import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { HttpStatusCode } from "./types";
import { ApiError } from "./lib/response";

export async function middleware(request: NextRequest) {
  console.log("request url", request.url);
  const user = await auth();
  if (!user) {
    if (request.url.includes("api")) {
      return NextResponse.json(
        new ApiError(
          "Unauthorized",
          "You are not authorized to access this resource",
        ),
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/api/form/:path*",
    "/api/team/:path*",
    "/api/get-user/:path*",
    "/api/poster/create",
    "/api/poster/delete",
    "/api/poster/my-programs",
    "/profile/:path*",
    "/events/create",
    "/events/form/:path*",
    "/program/:path*",
  ],
};
