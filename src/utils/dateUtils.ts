/**
 * Utilitários de data para contadores progressivos e regressivos.
 * Datas anuais e fixas usam meia-noite em São Paulo (America/Sao_Paulo, UTC−3).
 */

const SAO_PAULO_TZ = "America/Sao_Paulo";
/** 00:00 em São Paulo (UTC−3) = 03:00 UTC no mesmo dia civil. */
const SAO_PAULO_MIDNIGHT_UTC_HOUR = 3;

function getCalendarPartsInTimeZone(
  date: Date,
  timeZone: string
): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  return { year: get("year"), month: get("month") - 1, day: get("day") };
}

/** Meia-noite em São Paulo como instante UTC (para datas fixas). */
export function dateAtSaoPauloMidnight(
  year: number,
  month: number,
  day: number
): Date {
  return new Date(
    Date.UTC(year, month, day, SAO_PAULO_MIDNIGHT_UTC_HOUR, 0, 0, 0)
  );
}

/**
 * Retorna a próxima ocorrência de um dia/mês (meia-noite UTC), no mesmo formato que
 * `new Date(Date.UTC(ano, mês, dia, ...))` usado nas datas fixas (ex.: casamento).
 * No dia do evento em UTC, o alvo continua sendo a meia-noite desse dia (já passou),
 * para `getTimeUntil` marcar fim da contagem e o botão aparecer — só depois avança o ano.
 */
export function getNextOccurrence(month: number, day: number): Date {
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  let next = new Date(Date.UTC(currentYear, month, day, 0, 0, 0, 0));
  if (next.getTime() <= now.getTime()) {
    const isStillEventDayUtc =
      now.getUTCMonth() === month && now.getUTCDate() === day;
    if (isStillEventDayUtc) {
      return next;
    }
    next = new Date(Date.UTC(currentYear + 1, month, day, 0, 0, 0, 0));
  }
  return next;
}

/**
 * Próxima ocorrência à meia-noite em São Paulo (America/Sao_Paulo).
 * `month` é 0-indexado (0 = janeiro), como em `Date`.
 */
export function getNextOccurrenceSaoPaulo(month: number, day: number): Date {
  const now = new Date();
  const { year: currentYear } = getCalendarPartsInTimeZone(now, SAO_PAULO_TZ);
  let next = dateAtSaoPauloMidnight(currentYear, month, day);

  if (next.getTime() <= now.getTime()) {
    const today = getCalendarPartsInTimeZone(now, SAO_PAULO_TZ);
    const isStillEventDay =
      today.year === currentYear && today.month === month && today.day === day;
    if (isStillEventDay) {
      return next;
    }
    next = dateAtSaoPauloMidnight(currentYear + 1, month, day);
  }
  return next;
}

/**
 * Diferença em dias entre duas datas (truncada, baseada em meia-noite UTC).
 */
export function diffInDays(from: Date, to: Date): number {
  const fromMidnight = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  const toMidnight = Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate());
  return Math.floor((toMidnight - fromMidnight) / (24 * 60 * 60 * 1000));
}

/**
 * Dias desde a data inicial até hoje (inclusive).
 */
export function daysSince(start: Date): number {
  return diffInDays(start, new Date());
}

/**
 * Decomposição do tempo restante até uma data (em UTC).
 */
export function getTimeUntil(target: Date): CountdownParts {
  const now = new Date();
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, isPast: false };
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

/**
 * Tempo decorrido desde uma data (para contagem progressiva).
 * Anos/meses são aproximados a partir do total de dias.
 */
export function getElapsedFrom(start: Date): ElapsedParts {
  const now = new Date();
  const totalMs = now.getTime() - start.getTime();
  if (totalMs <= 0) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const totalSeconds = Math.floor(totalMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);

  const years = Math.floor(totalDays / 365.25);
  const remainderDays = totalDays - years * 365.25;
  const months = Math.floor(remainderDays / 30.44);
  const days = Math.round(remainderDays - months * 30.44);

  return { years, months, days, hours, minutes, seconds };
}

export interface ElapsedParts {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Quebra total de dias em anos, meses e dias (aproximado, para exibição). */
export function breakDaysIntoYMD(totalDays: number): { years: number; months: number; days: number } {
  if (totalDays <= 0) return { years: 0, months: 0, days: 0 };
  const years = Math.floor(totalDays / 365.25);
  const remainderDays = totalDays - years * 365.25;
  const months = Math.floor(remainderDays / 30.44);
  const days = Math.round(remainderDays - months * 30.44);
  return { years, months, days };
}
