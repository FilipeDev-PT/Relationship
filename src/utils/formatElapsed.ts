import type { ElapsedParts } from "./dateUtils";

/**
 * Formata tempo decorrido (contagem progressiva) com anos, meses, dias e h/m/s.
 * Ex: "0 anos, 2 meses, 15 dias · 14h 30m 22s"
 */
export function formatElapsed(value: ElapsedParts): string {
  const { years, months, days, hours, minutes, seconds } = value;
  const dateParts: string[] = [];
  if (years > 0) dateParts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
  if (months > 0) dateParts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
  if (days > 0) dateParts.push(`${days} ${days === 1 ? "dia" : "dias"}`);
  const dateStr = dateParts.length > 0 ? dateParts.join(", ") : "0 dias";
  const timeStr = `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  return `${dateStr} · ${timeStr}`;
}
