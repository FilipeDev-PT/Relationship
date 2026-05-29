/**
 * Paths das rotas (single source of truth para links e router).
 */

export const ROUTES = {
  HOME: "/",
  /** Redireciona para a timeline */
  ANIVERSARIO_NAMORO: "/aniversario-namoro",
  ANIVERSARIO_NAMORO_TIMELINE: "/aniversario-namoro/timeline",
  ANIVERSARIO_NAMORO_MEMORYGAME: "/aniversario-namoro/memorygame",
  /** Caça-palavras (após o jogo da memória) */
  ANIVERSARIO_NAMORO_CACAPALAVRAS: "/aniversario-namoro/cacapalavras",
  /** 100 motivos para te amar (após o caça-palavras) */
  ANIVERSARIO_NAMORO_100MOTIVOS: "/aniversario-namoro/100motivos",
  /** Livro de texto interativo (após os 100 motivos) */
  ANIVERSARIO_NAMORO_LIVRO: "/aniversario-namoro/livro",
  /** Página final do aniversário (após o livro) */
  ANIVERSARIO_NAMORO_FINAL: "/aniversario-namoro/final",
  CASAMENTO: "/casamento",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
