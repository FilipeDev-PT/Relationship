import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { WordSearch } from "../../components/WordSearch";
import { CACA_PALAVRAS_WORDS, CACA_PALAVRAS_GRID_SIZE } from "../../data/cacaPalavrasData";
import { ROUTES } from "../../constants/routes";

const navBtnSecondary =
  "cursor-pointer inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded-xl bg-white/15 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/25 active:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/50";

const navBtnPrimary =
  "cursor-pointer inline-flex min-h-[48px] w-full max-w-sm items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500/90 to-purple-600/90 px-6 py-3 text-center text-base font-semibold text-white shadow-lg transition hover:from-rose-500 hover:to-purple-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white/60";

export function CacaPalavrasPage() {
  const [complete, setComplete] = useState(false);

  return (
    <main className="overflow-x-hidden px-4 pt-6 pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-8 md:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-6 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Caça-palavras
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-pretty text-sm text-white/75 sm:text-base">
            Encontra as palavras escondidas — toca e arrasta na grelha para
            selecionar.
          </p>
        </header>

        <WordSearch
          words={CACA_PALAVRAS_WORDS}
          gridSize={CACA_PALAVRAS_GRID_SIZE}
          onComplete={() => setComplete(true)}
        />

        <div className="mx-auto mt-10 flex w-full max-w-sm flex-col items-stretch gap-4 border-t border-white/10 pt-8 sm:mt-12 sm:gap-6 sm:pt-10">
          {complete ? (
            <Link to={ROUTES.ANIVERSARIO_NAMORO_100MOTIVOS} className={navBtnPrimary}>
              Próxima página
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span
                className="inline-flex min-h-[48px] w-full cursor-not-allowed items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/5 px-6 py-3 text-center text-base font-semibold text-white/45"
                aria-disabled
                title="Encontra todas as palavras para continuar"
              >
                Próxima página
              </span>
              <p className="text-center text-xs text-white/50">
                Encontra todas as palavras para desbloquear
              </p>
            </div>
          )}

          <Link
            to={ROUTES.ANIVERSARIO_NAMORO_MEMORYGAME}
            className={navBtnSecondary}
          >
            Voltar ao jogo da memória
          </Link>
        </div>
      </div>
    </main>
  );
}
