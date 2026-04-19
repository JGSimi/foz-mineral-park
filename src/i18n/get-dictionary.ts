import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/pt";

const loaders = {
  pt: () => import("./dictionaries/pt").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}

export type { Dictionary };
