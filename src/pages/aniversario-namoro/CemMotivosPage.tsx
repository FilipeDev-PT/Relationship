import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { CEM_MOTIVOS, CEM_MOTIVOS_TITULO } from "../../data/cemMotivosData";
import { ROUTES } from "../../constants/routes";

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(CEM_MOTIVOS.length / ITEMS_PER_PAGE);

const navBtnSecondary =
  "cursor-pointer inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded-xl bg-white/15 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/25 active:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/50";

const navBtnPrimary =
  "cursor-pointer inline-flex min-h-[48px] w-full max-w-sm items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500/90 to-purple-600/90 px-6 py-3 text-center text-base font-semibold text-white shadow-lg transition hover:from-rose-500 hover:to-purple-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white/60";

const navBtnPager =
  "cursor-pointer inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-white/15 px-4 text-sm font-medium text-white transition-colors hover:bg-white/25 active:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/50 sm:flex-none sm:min-w-[7rem]";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function CemMotivosPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set());
  const listRef = useRef<HTMLDivElement>(null);

  const startIdx = currentPage * ITEMS_PER_PAGE;
  const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, CEM_MOTIVOS.length);
  const pageItems = CEM_MOTIVOS.slice(startIdx, endIdx);

  useEffect(() => {
    if (!isRevealed) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    pageItems.forEach((_, i) => {
      const globalIdx = startIdx + i;
      timers.push(
        setTimeout(() => {
          setRevealedItems((prev) => new Set(prev).add(globalIdx));
        }, i * 120)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [currentPage, isRevealed, startIdx, pageItems.length]);

  const handleReveal = useCallback(() => {
    setIsRevealed(true);
    scrollToTop();
  }, []);

  const goToPage = useCallback((page: number) => {
    if (page < 0 || page >= TOTAL_PAGES) return;
    setCurrentPage(page);
    scrollToTop();
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const isLastPage = currentPage === TOTAL_PAGES - 1;
  const allCurrentRevealed = pageItems.every((_, i) =>
    revealedItems.has(startIdx + i)
  );

  if (!isRevealed) {
    return (
      <main className="flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center overflow-x-hidden px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:py-12">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center sm:gap-8">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-rose-500/10 blur-2xl" />
            <span className="relative text-5xl sm:text-6xl" role="img" aria-label="coração">
              💕
            </span>
          </div>

          <div className="px-1">
            <h1 className="text-pretty text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {CEM_MOTIVOS_TITULO}
            </h1>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
              Preparei uma lista especial só para ti. Cada motivo é uma razão
              pela qual o meu coração te escolhe, todos os dias.
            </p>
          </div>

          <div className="flex w-full max-w-sm flex-col items-stretch gap-3">
            <button type="button" onClick={handleReveal} className={navBtnPrimary}>
              Descobrir os motivos
            </button>

            <Link
              to={ROUTES.ANIVERSARIO_NAMORO_CACAPALAVRAS}
              className={navBtnSecondary}
            >
              Voltar ao caça-palavras
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden px-4 pt-6 pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-8 md:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <header ref={listRef} className="mb-6 scroll-mt-6 text-center sm:mb-8">
          <h1 className="text-pretty text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {CEM_MOTIVOS_TITULO}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Página {currentPage + 1} de {TOTAL_PAGES}
          </p>
        </header>

        <div className="space-y-2.5 sm:space-y-4">
          {pageItems.map((motivo, i) => {
            const globalIdx = startIdx + i;
            const number = globalIdx + 1;
            const visible = revealedItems.has(globalIdx);

            return (
              <div
                key={globalIdx}
                className={`flex gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 backdrop-blur-sm transition-all duration-500 sm:gap-4 sm:px-5 sm:py-4 ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500/80 to-purple-600/80 text-xs font-bold text-white shadow-sm sm:h-9 sm:w-9 sm:text-sm">
                  {number}
                </span>
                <p className="min-w-0 flex-1 self-center text-pretty text-sm leading-relaxed text-white/90 sm:text-base">
                  {motivo}
                </p>
              </div>
            );
          })}
        </div>

        {allCurrentRevealed && (
          <nav className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:gap-4">
            {(currentPage > 0 || !isLastPage) && (
              <div className="flex w-full gap-2 sm:justify-center sm:gap-3">
                {currentPage > 0 && (
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    className={navBtnPager}
                  >
                    ← Anterior
                  </button>
                )}
                {!isLastPage && (
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    className={navBtnPager}
                  >
                    Seguinte →
                  </button>
                )}
              </div>
            )}

            {isLastPage && (
              <Link to={ROUTES.ANIVERSARIO_NAMORO_LIVRO} className={navBtnPrimary}>
                Próxima página
              </Link>
            )}

            <Link
              to={ROUTES.ANIVERSARIO_NAMORO_CACAPALAVRAS}
              className={navBtnSecondary}
            >
              Voltar ao caça-palavras
            </Link>
          </nav>
        )}
      </div>
    </main>
  );
}
