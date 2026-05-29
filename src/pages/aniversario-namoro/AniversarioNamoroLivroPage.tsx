import { Link } from "@tanstack/react-router";
import { InteractiveBook } from "../../components/InteractiveBook";
import { ROUTES } from "../../constants/routes";

/**
 * Texto interativo em formato de livro (após o jogo da memória).
 */
export function AniversarioNamoroLivroPage() {
  return (
    <main className="overflow-x-hidden px-4 pt-4 pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-6 md:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-rose-200/75">
          Para ti
        </p>
        <InteractiveBook />
        <div className="mx-auto mt-10 flex w-full max-w-sm justify-center">
          <Link
            to={ROUTES.ANIVERSARIO_NAMORO_100MOTIVOS}
            className="cursor-pointer inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-white/15 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/25 active:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/50"
          >
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

