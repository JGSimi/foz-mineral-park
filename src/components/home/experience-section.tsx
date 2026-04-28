import { site } from "@/lib/site";
import { heroPoster } from "@/lib/images";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { HeroVideo } from "@/components/hero-video";

export function ExperienceSection({
  dict,
}: {
  dict: Dictionary;
}) {
  const e = dict.experience;

  return (
    <section
      aria-labelledby="video-experience-title"
      className="relative bg-obsidian-950"
    >
      <h2 id="video-experience-title" className="sr-only">
        {e.titleLead} {e.titleEm}
        {e.titleTail}
      </h2>
      <HeroVideo src={site.hero.video} poster={heroPoster} minWidth={0} />
    </section>
  );
}
