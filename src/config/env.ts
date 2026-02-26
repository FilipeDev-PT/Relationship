/**
 * Retorna o ambiente atual da aplicação.
 * - production: npm run dev (ou build)
 * - qa: npm run dev:qa
 */
export const appEnv = import.meta.env.VITE_APP_ENV ?? "production";

export const isQA = (): boolean => appEnv === "qa";
export const isProduction = (): boolean => appEnv === "production";
