/**
 * Fotos do jogo da memória (cada item = um par; o baralho duplica automaticamente).
 * Troca por ficheiros em `public/memory-game/` (ex.: `/memory-game/1.jpg`).
 * Precisas de pelo menos 4 imagens para 4 pares (8 cartas).
 */
export type MemoryGamePhoto = {
  src: string;
  alt: string;
};

export const MEMORY_GAME_PHOTOS: MemoryGamePhoto[] = [
  { src: "https://picsum.photos/seed/nosso1/320/320", alt: "Nosso momento 1" },
  { src: "https://picsum.photos/seed/nosso2/320/320", alt: "Nosso momento 2" },
  { src: "https://picsum.photos/seed/nosso3/320/320", alt: "Nosso momento 3" },
  { src: "https://picsum.photos/seed/nosso4/320/320", alt: "Nosso momento 4" },
  { src: "https://picsum.photos/seed/nosso5/320/320", alt: "Nosso momento 5" },
  { src: "https://picsum.photos/seed/nosso6/320/320", alt: "Nosso momento 6" },
];
