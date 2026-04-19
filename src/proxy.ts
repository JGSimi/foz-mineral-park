import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Redireciona qualquer path sem prefixo de locale para o locale detectado
 * (via Accept-Language) ou o default. Paths institucionais (política,
 * termos) e arquivos estáticos passam direto.
 */

const PUBLIC_FILE = /\.(.*)$/;

const PASSTHROUGH_PATHS = new Set<string>([
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/sitemap.xml",
  "/robots.txt",
]);

const PASSTHROUGH_PREFIXES = ["/_next", "/api", "/media", "/.well-known"];

function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;
  const preferred = header
    .split(",")
    .map((p) => p.split(";")[0].trim().toLowerCase())
    .map((tag) => tag.split("-")[0]);
  for (const tag of preferred) {
    if ((locales as readonly string[]).includes(tag)) return tag as Locale;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (PASSTHROUGH_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }
  if (PUBLIC_FILE.test(pathname)) return NextResponse.next();
  if (PASSTHROUGH_PATHS.has(pathname)) return NextResponse.next();

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const target = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(new URL(target + search, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|media|\\.well-known|.*\\..*).*)"],
};
