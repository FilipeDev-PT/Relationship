import { breakDaysIntoYMD } from "./dateUtils";

/**
 * Formata contagem regressiva com anos, meses, dias, horas, minutos e segundos.
 * Quando a data já passou, retorna "Hoje!".
 */
export function formatCountdown(value: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTodayOrPast: boolean;
}): string {
  if (value.isTodayOrPast) return "Hoje!";
  const { years, months, days } = breakDaysIntoYMD(value.days);
  const dateParts: string[] = [];
  if (years > 0) dateParts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
  if (months > 0) dateParts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
  if (days > 0) dateParts.push(`${days} ${days === 1 ? "dia" : "dias"}`);
  const dateStr = dateParts.length > 0 ? dateParts.join(", ") : "0 dias";
  const timeStr = `${String(value.hours).padStart(2, "0")}h ${String(value.minutes).padStart(2, "0")}m ${String(value.seconds).padStart(2, "0")}s`;
  return `${dateStr} · ${timeStr}`;
}
