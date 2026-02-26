/** Resultado de contagem regressiva (dias, horas, minutos, segundos até a data) */
export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTodayOrPast: boolean;
}

/** Contagem progressiva: número de dias desde a data inicial */
export type ProgressiveValue = number;

/** Identificador do tipo de contador para roteamento e labels */
export type CounterId = "dating" | "her-birthday" | "dating-anniversary" | "wedding";

export interface CounterConfig {
  id: CounterId;
  title: string;
  /** Se true, mostra contagem progressiva (dias desde); se false, regressiva (tempo até) */
  progressive: boolean;
  /** Rota da página do dia especial (usada no botão) */
  route: string;
  /** Label do botão que leva à página */
  buttonLabel: string;
}
