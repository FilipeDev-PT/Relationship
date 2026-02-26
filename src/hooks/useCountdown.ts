import { useState, useEffect } from "react";
import { getTimeUntil } from "../utils/dateUtils";
import type { CountdownValue } from "../types/counters";

/**
 * Hook que retorna a contagem regressiva até uma data alvo.
 * Atualiza a cada segundo para segundos/minutos/horas corretos.
 */
export function useCountdown(targetDate: Date): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(() => {
    const p = getTimeUntil(targetDate);
    return {
      days: p.days,
      hours: p.hours,
      minutes: p.minutes,
      seconds: p.seconds,
      isTodayOrPast: p.isPast,
    };
  });

  useEffect(() => {
    const tick = () => {
      const p = getTimeUntil(targetDate);
      setValue({
        days: p.days,
        hours: p.hours,
        minutes: p.minutes,
        seconds: p.seconds,
        isTodayOrPast: p.isPast,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate.getTime()]);

  return value;
}
