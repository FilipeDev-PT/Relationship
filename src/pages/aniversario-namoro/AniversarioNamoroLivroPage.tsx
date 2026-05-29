import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { InteractiveBook } from "../../components/InteractiveBook";
import { ROUTES } from "../../constants/routes";

const navBtnSecondary =
  "cursor-pointer inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded-xl bg-white/15 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/25 active:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/50";

const navBtnPrimary =
  "cursor-pointer inline-flex min-h-[48px] w-full max-w-sm items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500/90 to-purple-600/90 px-6 py-3 text-center text-base font-semibold text-white shadow-lg transition hover:from-rose-500 hover:to-purple-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white/60";

/**
 * Texto interativo em formato de livro (após os 100 motivos).
 */
export function AniversarioNamoroLivroPage() {
  const [onLastPage, setOnLastPage] = useState(false);

  return (
    <main className="overflow-x-hidden px-4 pt-4 pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-6 md:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-rose-200/75">
          Para ti
        </p>
        <InteractiveBook
          finishTo={ROUTES.ANIVERSARIO_NAMORO_FINAL}
          onLastPageChange={setOnLastPage}
        />

        <div className="mx-auto mt-10 flex w-full max-w-sm flex-col items-stretch gap-4">
          {onLastPage ? (
            <Link to={ROUTES.ANIVERSARIO_NAMORO_FINAL} className={navBtnPrimary}>
              Finalizar
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span
                className="inline-flex min-h-[48px] w-full cursor-not-allowed items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/5 px-6 py-3 text-center text-base font-semibold text-white/45"
                aria-disabled
                title="Lê até à última página para continuar"
              >
                Finalizar
              </span>
              <p className="text-center text-xs text-white/50">
                Lê até à última página para desbloquear
              </p>
            </div>
          )}

          <Link to={ROUTES.ANIVERSARIO_NAMORO_100MOTIVOS} className={navBtnSecondary}>
            Voltar
          </Link>
        </div>
        <p className="mt-2 text-center text-xs text-white/45">
          Só é possível regressar à página anterior
        </p>
      </div>
    </main>
  );
}
