import { useState, useEffect } from "react";
import { getElapsedFrom } from "../utils/dateUtils";
import type { ElapsedParts } from "../utils/dateUtils";

/**
 * Hook que retorna o tempo decorrido desde a data inicial (contagem progressiva).
 * Inclui anos, meses, dias, horas, minutos e segundos. Atualiza a cada segundo.
 */
export function useProgressiveCount(startDate: Date): ElapsedParts {
  const [value, setValue] = useState<ElapsedParts>(() => getElapsedFrom(startDate));

  useEffect(() => {
    const tick = () => setValue(getElapsedFrom(startDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startDate.getTime()]);

  return value;
}
