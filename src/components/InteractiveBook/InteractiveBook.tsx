import { useCallback, useEffect, useRef, useState } from "react";
import { LIVRO_MOCK_PAGES, LIVRO_MOCK_TITULO_CAPA } from "../../data/livroMockPages";

type FlipKind = "idle" | "next" | "prev";

/**
 * Livro: fechado = uma página de largura; aberto = o dobro (esquerda em branco + direita com texto na mesma largura da capa).
 * Troca de página = mesma animação da capa: `transition-transform duration-1000` + `rotateY(±132deg)` (ver `index.css`).
 */
export function InteractiveBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [flip, setFlip] = useState<FlipKind>("idle");
  const [flipArm, setFlipArm] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const pendingFlipRef = useRef<"next" | "prev" | null>(null);

  const total = LIVRO_MOCK_PAGES.length;
  const isFirst = pageIndex === 0;
  const isLast = pageIndex >= total - 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPrefersReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const completeFlip = useCallback(() => {
    const p = pendingFlipRef.current;
    pendingFlipRef.current = null;
    if (p === "next") setPageIndex((i) => Math.min(i + 1, total - 1));
    if (p === "prev") setPageIndex((i) => Math.max(i - 1, 0));
    setFlip("idle");
    setFlipArm(false);
  }, [total]);

  useEffect(() => {
    if (flip === "idle") {
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFlipArm(true));
    });
    return () => cancelAnimationFrame(id);
  }, [flip]);

  const onFlipTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
      if (flip === "idle" || !flipArm) return;
      completeFlip();
    },
    [flip, flipArm, completeFlip]
  );

  const goNext = useCallback(() => {
    if (pageIndex >= total - 1 || flip !== "idle") return;
    if (prefersReducedMotion) {
      setPageIndex((i) => Math.min(i + 1, total - 1));
      return;
    }
    pendingFlipRef.current = "next";
    setFlipArm(false);
    setFlip("next");
  }, [pageIndex, total, flip, prefersReducedMotion]);

  const goPrev = useCallback(() => {
    if (pageIndex <= 0 || flip !== "idle") return;
    if (prefersReducedMotion) {
      setPageIndex((i) => Math.max(i - 1, 0));
      return;
    }
    pendingFlipRef.current = "prev";
    setFlipArm(false);
    setFlip("prev");
  }, [pageIndex, flip, prefersReducedMotion]);

  const openBook = useCallback(() => {
    setIsOpen(true);
  }, []);

  const textCurrent = LIVRO_MOCK_PAGES[pageIndex];
  const textPrev = pageIndex > 0 ? LIVRO_MOCK_PAGES[pageIndex - 1] : "";

  const leafTurnClasses =
    "transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:!duration-300";

  return (
    <div
      className={`mx-auto w-full transition-[max-width] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
        isOpen
          ? "max-w-[min(96vw,600px,calc(82dvh*20/29))]"
          : "max-w-[min(88vw,300px)]"
      }`}
    >
      <div className="interactive-book-stage relative mx-auto w-full" style={{ perspective: "1600px" }}>
        <div
          className={`relative aspect-[20/29] w-full rounded-lg ${
            isOpen ? "min-h-0" : "min-h-[min(72vw,420px)] sm:min-h-[440px]"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={`absolute inset-0 flex h-full min-h-0 w-full overflow-hidden rounded-r-lg rounded-l-lg border border-amber-950/40 shadow-2xl transition-opacity delay-0 duration-700 ease-out motion-reduce:transition-none ${
              isOpen
                ? "pointer-events-auto opacity-100 delay-200 motion-reduce:delay-0"
                : "pointer-events-none opacity-0"
            }`}
            style={{
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 60px rgba(139,90,43,0.08)",
            }}
            aria-hidden={!isOpen}
          >


            {/* Metade direita: largura = capa fechada; aqui está o texto */}
            <div className="relative flex h-full min-h-0 w-full min-w-0 flex-col bg-gradient-to-br from-[#fdf8f0] via-[#faf5eb] to-[#f5ebe0] px-3 py-4 sm:px-5 sm:py-6 md:px-6 md:py-8">
              <div
                className="pointer-events-none absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent via-amber-900/15 to-transparent"
                aria-hidden
              />

              <div
                className="interactive-book-page-3d relative min-h-0 flex-1"
                style={{ perspective: "1400px" }}
              >
                <div
                  className="absolute inset-0 z-0 rounded-sm bg-gradient-to-br from-[#fdf8f0] via-[#faf5eb] to-[#f5ebe0]"
                  aria-hidden
                />

                {flip === "idle" && (
                  <div className="relative z-10 flex min-h-0 flex-1 flex-col px-0.5">
                    <p className="text-pretty text-left text-sm leading-relaxed text-amber-950/90 sm:text-base md:text-[1.05rem] md:leading-7">
                      {textCurrent}
                    </p>
                  </div>
                )}

                {flip === "next" && (
                  <div
                    className="absolute inset-0 z-20"
                    style={{ transformStyle: "preserve-3d", transformOrigin: "left center" }}
                  >
                    <div
                      className={`absolute inset-0 overflow-hidden rounded-sm bg-gradient-to-br from-[#fdf8f0] via-[#faf5eb] to-[#f5ebe0] ${leafTurnClasses} ${
                        flipArm ? "interactive-book-leaf-out-next" : ""
                      }`}
                      style={{ transformStyle: "preserve-3d", transformOrigin: "left center" }}
                      onTransitionEnd={onFlipTransitionEnd}
                    >
                      <div className="relative z-10 flex min-h-0 h-full flex-col px-0.5">
                        <p className="text-pretty text-left text-sm leading-relaxed text-amber-950/90 sm:text-base md:text-[1.05rem] md:leading-7">
                          {textCurrent}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {flip === "prev" && (
                  <>
                    <div className="absolute inset-0 z-[5] overflow-hidden rounded-sm bg-gradient-to-br from-[#fdf8f0] via-[#faf5eb] to-[#f5ebe0]">
                      <div className="relative z-10 flex min-h-0 h-full flex-col px-0.5">
                        <p className="text-pretty text-left text-sm leading-relaxed text-amber-950/90 sm:text-base md:text-[1.05rem] md:leading-7">
                          {textPrev}
                        </p>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 z-20"
                      style={{ transformStyle: "preserve-3d", transformOrigin: "right center" }}
                    >
                    <div
                      className={`absolute inset-0 overflow-hidden rounded-sm bg-gradient-to-br from-[#fdf8f0] via-[#faf5eb] to-[#f5ebe0] ${leafTurnClasses} ${
                          flipArm ? "interactive-book-leaf-out-prev" : ""
                        }`}
                        style={{ transformStyle: "preserve-3d", transformOrigin: "right center" }}
                        onTransitionEnd={onFlipTransitionEnd}
                      >
                        <div className="relative z-10 flex min-h-0 h-full flex-col px-0.5">
                          <p className="text-pretty text-left text-sm leading-relaxed text-amber-950/90 sm:text-base md:text-[1.05rem] md:leading-7">
                            {textCurrent}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="relative z-30 mt-auto flex items-center justify-between gap-3 pt-4">
                {!isFirst ? (
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={flip !== "idle"}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-amber-900/20 bg-white/60 text-lg text-amber-950 shadow-sm transition hover:bg-white/90 hover:shadow focus-visible:ring-2 focus-visible:ring-rose-400/60 enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
                    aria-label="Página anterior"
                  >
                    ←
                  </button>
                ) : (
                  <span className="h-11 w-11" aria-hidden />
                )}

                {!isLast ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={flip !== "idle"}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-amber-900/20 bg-white/60 text-lg text-amber-950 shadow-sm transition hover:bg-white/90 hover:shadow focus-visible:ring-2 focus-visible:ring-rose-400/60 enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
                    aria-label="Página seguinte"
                  >
                    →
                  </button>
                ) : (
                  <span className="h-11 w-11" aria-hidden />
                )}
              </div>
            </div>
          </div>

          <div
            className={`interactive-book-cover absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 rounded-lg border-2 border-amber-800/50 px-6 text-center shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:!duration-300 ${
              isOpen ? "interactive-book-cover--open" : ""
            }`}
            style={{
              transformOrigin: "left center",
              background:
                "linear-gradient(145deg, #5c3d2e 0%, #3d2817 35%, #2a1a0f 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,200,150,0.12), 0 20px 40px rgba(0,0,0,0.45), 4px 0 12px rgba(0,0,0,0.25)",
            }}
          >
            <svg
              className="pointer-events-none absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] opacity-30"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <rect
                x="1.5"
                y="1.5"
                width="97"
                height="97"
                rx="2"
                fill="none"
                stroke="url(#livro-gold)"
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="livro-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4a574" />
                  <stop offset="100%" stopColor="#8b6914" />
                </linearGradient>
              </defs>
            </svg>

            {!isOpen && (
              <>
                <div className="relative z-10 max-w-[12rem] px-1">
                  <h2 className="font-serif text-xl font-semibold tracking-tight text-amber-100/95 sm:text-2xl">
                    {LIVRO_MOCK_TITULO_CAPA}
                  </h2>
                  <p className="mt-2 text-xs text-amber-200/60 sm:text-sm">Um texto só teu</p>
                </div>
                <button
                  type="button"
                  onClick={openBook}
                  className="cursor-pointer relative z-10 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-amber-400/40 bg-amber-100/15 px-6 py-2.5 text-sm font-semibold text-amber-50 backdrop-blur-sm transition hover:bg-amber-100/25 focus-visible:ring-2 focus-visible:ring-amber-200/70 motion-reduce:transition-none"
                >
                  Abrir livro
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
