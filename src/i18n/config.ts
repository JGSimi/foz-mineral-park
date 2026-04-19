export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeLabel: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export const localeName: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

/** Locale completo para tags HTML lang / og:locale */
export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es",
};

export const ogLocale: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
