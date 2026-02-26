/**
 * Paths das rotas (single source of truth para links e router).
 */

export const ROUTES = {
  HOME: "/",
  ANIVERSARIO_DELA: "/aniversario-dela",
  ANIVERSARIO_NAMORO: "/aniversario-namoro",
  CASAMENTO: "/casamento",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
