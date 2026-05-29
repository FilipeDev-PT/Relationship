import { Link } from "@tanstack/react-router";
import { VerticalTimeline } from "../../components/Timeline";
import { ANIVERSARIO_NAMORO_TIMELINE } from "../../data/aniversarioNamoroTimeline";
import { ROUTES } from "../../constants/routes";

/**
 * Linha do tempo do aniversário de namoro (rota `/aniversario-namoro/timeline`).
 */
export function AniversarioNamoroTimelinePage() {
  return (
    <main className="px-4 pt-6 sm:px-6 sm:pt-8 md:px-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 text-center sm:mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-200/80">
            Um dia especial
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Nossa história em momentos
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-base text-white/75 sm:text-lg">
            Cada momento na ordem em que aconteceu — rola pra viver de novo comigo.
          </p>
        </header>

        <VerticalTimeline
          entries={ANIVERSARIO_NAMORO_TIMELINE}
          ariaLabel="Momentos do aniversário de namoro"
        />

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-10">
          <Link
            to={ROUTES.ANIVERSARIO_NAMORO_MEMORYGAME}
            className="inline-flex min-h-[48px] w-full max-w-sm items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500/90 to-purple-600/90 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:from-rose-500 hover:to-purple-600 focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto"
          >
            Próxima página
          </Link>
        </div>
      </div>
    </main>
  );
}

