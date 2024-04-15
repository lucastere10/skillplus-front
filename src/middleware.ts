import { NextRequest, NextResponse } from 'next/server'

const AlreadyAuthPaths = ["/login", "/register"];
const NotAuthPaths = ["/upload-picture","/complete-profile", "/cards", "/cards/new", "/profile", "/search-profiles", "/admin"]

export async function middleware(request: NextRequest) {
  if (request.cookies.has('next-auth.session-token')) {
    if (AlreadyAuthPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (NotAuthPaths.includes(request.nextUrl.pathname) || request.nextUrl.pathname.startsWith('/profile/')) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
