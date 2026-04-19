import { locales, type Locale } from "./config";

/** Gera um href apontando para a mesma rota no locale indicado. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  // âncoras: /pt#atracoes, /en#atracoes
  if (clean.startsWith("/#")) return `/${locale}${clean.slice(1)}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

/** Extrai o locale do pathname atual. Retorna null se não houver. */
export function extractLocale(pathname: string): Locale | null {
  for (const l of locales) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return l;
  }
  return null;
}

/** Remove o prefixo de locale do pathname (retorna `/` se era só o locale). */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(`/${l}`.length);
  }
  return pathname;
}
