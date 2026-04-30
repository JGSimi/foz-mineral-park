import type { Dictionary } from "@/i18n/dictionaries/pt";
import type { Locale } from "@/i18n/config";
import { ScrollStory } from "@/components/home/scroll-story";

export function ExperienceSection({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return <ScrollStory dict={dict} locale={locale} />;
}
