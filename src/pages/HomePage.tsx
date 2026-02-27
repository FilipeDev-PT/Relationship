import { CounterCard } from "../components/CounterCard";
import { useCountdown, useProgressiveCount } from "../hooks";
import { formatCountdown } from "../utils/formatCountdown";
import { formatElapsed } from "../utils/formatElapsed";
import { ROUTES } from "../constants/routes";
import {
  DATING_START_DATE,
  HER_BIRTHDAY_MONTH,
  HER_BIRTHDAY_DAY,
  DATING_ANNIVERSARY_MONTH,
  DATING_ANNIVERSARY_DAY,
  WEDDING_DATE,
} from "../constants/dates";
import { getNextOccurrence } from "../utils/dateUtils";

/**
 * Página inicial: apenas os 4 contadores centralizados, sem outras ações.
 * Layout responsivo (mobile, tablet, desktop, TV).
 * Botões dos contadores regressivos só aparecem quando a contagem termina.
 */
export function HomePage() {
  const elapsedDating = useProgressiveCount(DATING_START_DATE);
  const nextHerBirthday = getNextOccurrence(HER_BIRTHDAY_MONTH, HER_BIRTHDAY_DAY);
  const nextDatingAnniversary = getNextOccurrence(
    DATING_ANNIVERSARY_MONTH,
    DATING_ANNIVERSARY_DAY
  );

  const countdownHerBirthday = useCountdown(nextHerBirthday);
  const countdownDatingAnniversary = useCountdown(nextDatingAnniversary);
  const countdownWedding = useCountdown(WEDDING_DATE);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 box-border">
      <div className="w-full max-w-[90vw] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 place-items-stretch min-h-[30vh]">
        <CounterCard title="Tempo de namoro">
          {formatElapsed(elapsedDating)}
        </CounterCard>

        <CounterCard
          title="Aniversário do meu amorzinho"
          route={ROUTES.ANIVERSARIO_DELA}
          buttonLabel="Ir para o dia"
          showButton={countdownHerBirthday.isTodayOrPast}
        >
          {formatCountdown(countdownHerBirthday)}
        </CounterCard>

        <CounterCard
          title="Aniversário de namoro"
          route={ROUTES.ANIVERSARIO_NAMORO}
          buttonLabel="Ir para o dia"
          showButton={countdownDatingAnniversary.isTodayOrPast}
        >
          {formatCountdown(countdownDatingAnniversary)}
        </CounterCard>

        <CounterCard
          title="Nosso casamento"
          route={ROUTES.CASAMENTO}
          buttonLabel="Ir para o dia"
          showButton={countdownWedding.isTodayOrPast}
          variant="highlight"
        >
          {formatCountdown(countdownWedding)}
        </CounterCard>
      </div>
    </main>
  );
}
