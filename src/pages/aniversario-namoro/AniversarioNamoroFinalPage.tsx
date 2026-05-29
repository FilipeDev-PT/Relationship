import { Link } from "@tanstack/react-router";
import { ROUTES } from "../../constants/routes";

/**
 * Página final do aniversário de namoro (após o livro).
 */
export function AniversarioNamoroFinalPage() {
  return (
    <main className="flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center overflow-x-hidden px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center">
        <div className="final-heart-pulse relative">
          <div
            className="pointer-events-none absolute -inset-8 rounded-full bg-rose-500/20 blur-3xl motion-reduce:blur-2xl"
            aria-hidden
          />
          <svg
            viewBox="0 0 240 220"
            className="relative h-auto w-[min(88vw,16rem)] drop-shadow-2xl sm:w-72"
            role="img"
            aria-label="Coração com a mensagem TE AMO PRA SEMPRE"
          >
            <defs>
              <linearGradient id="final-heart-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="50%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
              <filter id="final-heart-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#fb7185" floodOpacity="0.45" />
              </filter>
            </defs>
            <path
              filter="url(#final-heart-glow)"
              fill="url(#final-heart-fill)"
              d="M120 205 C120 205 20 130 20 72 C20 38 46 18 74 18 C94 18 110 30 120 46 C130 30 146 18 166 18 C194 18 220 38 220 72 C220 130 120 205 120 205 Z"
            />
            <text
              x="120"
              y="88"
              textAnchor="middle"
              fill="white"
              fontSize="15"
              fontWeight="700"
              letterSpacing="0.08em"
              fontFamily="system-ui, sans-serif"
            >
              TE AMO
            </text>
            <text
              x="120"
              y="112"
              textAnchor="middle"
              fill="white"
              fontSize="13"
              fontWeight="600"
              letterSpacing="0.12em"
              fontFamily="system-ui, sans-serif"
            >
              PRA SEMPRE
            </text>
          </svg>
        </div>

        <p className="max-w-xs text-pretty text-sm text-white/70 sm:text-base">
          Obrigado por cehgar até aqui, foi feito com muito amor pra você. Te amo muitão.
        </p>

        <Link
          to={ROUTES.ANIVERSARIO_NAMORO_LIVRO}
          className="cursor-pointer inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded-xl bg-white/15 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/25 active:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/50"
        >
          Voltar ao livro
        </Link>
      </div>
    </main>
  );
}
