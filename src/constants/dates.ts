/**
 * Constantes de datas do projeto (relacionamento).
 * Todas as datas em UTC para evitar problemas de timezone no cálculo dos contadores.
 */

/** Data de início do namoro: 31 de maio de 2025 */
export const DATING_START_DATE = new Date(Date.UTC(2025, 4, 31, 0, 0, 0, 0));

/** Aniversário dela: 27 de abril (apenas mês/dia; ano é calculado como próxima ocorrência) */
export const HER_BIRTHDAY_MONTH = 3; // 0-indexed: abril = 3
export const HER_BIRTHDAY_DAY = 27;

/** Aniversário de namoro: 31 de maio (mesmo dia do início) */
export const DATING_ANNIVERSARY_MONTH = 4; // 0-indexed: maio = 4
export const DATING_ANNIVERSARY_DAY = 31;

/** Data do casamento: 23 de setembro de 2028 */
export const WEDDING_DATE = new Date(Date.UTC(2028, 8, 23, 0, 0, 0, 0));
