/**
 * Constantes de datas do projeto (relacionamento).
 * Meia-noite em São Paulo (America/Sao_Paulo, UTC−3).
 */

import {
  dateAtSaoPauloMidnight,
  getNextOccurrenceSaoPaulo,
} from "../utils/dateUtils";

/** Data de início do namoro: 31 de maio de 2025, 00:00 em São Paulo */
export const DATING_START_DATE = dateAtSaoPauloMidnight(2025, 4, 31);

/**
 * Alvo da contagem regressiva até o aniversário do meu amor (27 de abril, 00:00 SP).
 */
export function herBirthdayTargetDate(): Date {
  return getNextOccurrenceSaoPaulo(3, 27);
}

/**
 * Alvo até o aniversário de namoro (31 de maio, 00:00 SP).
 * Mês 0-indexado: 4 = maio.
 */
export function datingAnniversaryTargetDate(): Date {
  return getNextOccurrenceSaoPaulo(4, 31);
}

/** Data do casamento: 23 de setembro de 2028, 00:00 em São Paulo */
export const WEDDING_DATE = dateAtSaoPauloMidnight(2028, 8, 23);
