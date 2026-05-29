import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MemoryGame } from "../../components/MemoryGame";
import { MEMORY_GAME_PHOTOS } from "../../data/memoryGamePhotos";
import { ROUTES } from "../../constants/routes";

/**
 * Jogo da memória com as nossas fotos (`/aniversario-namoro/memorygame`).
 */
export function MemoryGamePage() {
  const [gameComplete, setGameComplete] = useState(false);

  return (
    <main className="overflow-x-hidden px-4 pt-6 pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-8 md:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Jogo da memória
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-pretty text-sm text-white/75 sm:text-base">
            Encontra os pares das nossas fotos. Cada clique conta — diverte-te!
          </p>
        </header>

        <MemoryGame photos={MEMORY_GAME_PHOTOS} onWinChange={setGameComplete} />

        <div className="mx-auto mt-12 flex w-full max-w-sm flex-col items-stretch gap-4 border-t border-white/10 pt-8 sm:gap-6 sm:pt-10">
          {gameComplete ? (
            <Link
              to={ROUTES.ANIVERSARIO_NAMORO_CACAPALAVRAS}
              className="cursor-pointer inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500/90 to-purple-600/90 px-6 py-3 text-center text-base font-semibold text-white shadow-lg transition hover:from-rose-500 hover:to-purple-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Próxima página
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span
                className="inline-flex min-h-[48px] w-full cursor-not-allowed items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/5 px-6 py-3 text-center text-base font-semibold text-white/45"
                aria-disabled
                title="Completa todos os pares para continuar"
              >
                Próxima página
              </span>
              <p className="text-center text-xs text-white/50">
                Completa todos os pares para desbloquear
              </p>
            </div>
          )}

          <Link
            to={ROUTES.ANIVERSARIO_NAMORO_TIMELINE}
            className="cursor-pointer inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-white/15 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/25 active:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Voltar à linha do tempo
          </Link>
        </div>
      </div>
    </main>
  );
}

