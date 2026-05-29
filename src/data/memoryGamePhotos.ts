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
  { src: "/memory-game/MG1.jpg", alt: "Nosso momento 1" },
  { src: "/memory-game/MG2.jpg", alt: "Nosso momento 2" },
  { src: "/memory-game/MG3.jpg", alt: "Nosso momento 3" },
  { src: "/memory-game/MG4.jpg", alt: "Nosso momento 4" },
  { src: "/memory-game/MG5.jpg", alt: "Nosso momento 5" },
  { src: "/memory-game/MG6.jpg", alt: "Nosso momento 6" },
];
