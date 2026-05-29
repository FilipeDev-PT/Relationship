/**
 * Constantes de datas do projeto (relacionamento).
 * Todas as datas em UTC para evitar problemas de timezone no cálculo dos contadores.
 */

import { getNextOccurrence } from "../utils/dateUtils";

/** Data de início do namoro: 31 de maio de 2025 */
export const DATING_START_DATE = new Date(Date.UTC(2025, 4, 31, 0, 0, 0, 0));

/**
 * Alvo da contagem regressiva até o aniversário do meu amor (6 de abril, 00:00 UTC).
 * Mesmo tipo de `Date` que `WEDDING_DATE`; a próxima ocorrência anual é calculada como no casamento.
 */
export function herBirthdayTargetDate(): Date {
  return getNextOccurrence(3, 27);
}

/**
 * Alvo até o aniversário de namoro (31 de maio, 00:00 UTC) (Mês -1, Dia).
 */
export function datingAnniversaryTargetDate(): Date {
  return getNextOccurrence(4, 29);
}

/** Data do casamento: 23 de setembro de 2028 */
export const WEDDING_DATE = new Date(Date.UTC(2028, 8, 23, 0, 0, 0, 0));
