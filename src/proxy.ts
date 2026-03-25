import { NextRequest, NextResponse } from "next/server";
import { storageKeys } from "./utils/enum";

const AUTH_ROUTES = ["/login", "/enter-otp"];
const PROTECTED_PREFIXES = [
  "/overview",
  "/partners",
  "/teams",
  "/students",
  "/settings",
  "/help",
  "/onboarding",
];

function getAccessToken(req: NextRequest): string | null {
  const rawAuthToken = req.cookies.get(storageKeys.ACCESS_TOKEN)?.value;
  if (rawAuthToken) return rawAuthToken;

  const rawTokenCookie = req.cookies.get(storageKeys.ACCESS_TOKEN)?.value;
  if (!rawTokenCookie) return null;

  try {
    const decoded = decodeURIComponent(rawTokenCookie);
    const parsed = JSON.parse(decoded) as { accessToken?: string } | string;

    if (typeof parsed === "string") return parsed || null;
    return parsed?.accessToken ?? null;
  } catch {
    return rawTokenCookie;
  }
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = getAccessToken(req);
  const isAuthenticated = Boolean(token);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (pathname === "/") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = isAuthenticated ? "/overview" : "/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && isAuthRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/overview";
    return NextResponse.redirect(redirectUrl);
  }

  if (!isAuthenticated && isProtectedRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
