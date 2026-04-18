/**
 * Static image imports that let Next.js generate automatic blur placeholders
 * at build time. Importing the file directly (instead of using a string path)
 * gives us `width`, `height` and `blurDataURL` for free on every `<Image>`.
 */
import grutaDeAmetista from "../../public/media/attractions/gruta-de-ametista.jpg";
import museuDeMinerais from "../../public/media/attractions/museu-de-minerais.jpg";
import lojaDePedras from "../../public/media/attractions/loja-de-pedras.jpg";

export const attractionImages = {
  "gruta-de-ametista": grutaDeAmetista,
  "museu-de-minerais": museuDeMinerais,
  "loja-de-pedras": lojaDePedras,
} as const;

export type AttractionSlug = keyof typeof attractionImages;

export const heroPoster = grutaDeAmetista;
