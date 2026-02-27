import { Link } from "@tanstack/react-router";

type CounterCardProps = {
  title: string;
  /** Conteúdo principal: texto da contagem. Se contiver " · ", será exibido em duas linhas (data · hora). */
  children: React.ReactNode;
  route?: string;
  buttonLabel?: string;
  showButton?: boolean;
  /** Destaque visual sutil (ex.: card "Nosso casamento") */
  variant?: "default" | "highlight";
};

/**
 * Card de contador com hierarquia visual clara (data em destaque, hora em segunda linha).
 * variant="highlight" dá um destaque sutil ao card (borda e fundo mais quentes).
 */
export function CounterCard({
  title,
  children,
  route,
  buttonLabel,
  showButton = false,
  variant = "default",
}: CounterCardProps) {
  const showLink = showButton && route != null && buttonLabel != null;

  const isString = typeof children === "string";
  const hasDateTimeSplit = isString && (children as string).includes(" · ");
  const [datePart, timePart] = hasDateTimeSplit
    ? (children as string).split(" · ").map((s) => s.trim())
    : [null, null];

  const cardClasses =
    variant === "highlight"
      ? "rounded-2xl ring-1 ring-white/10 ring-inset bg-white/15 backdrop-blur-md shadow-xl shadow-amber-900/10 w-full h-full min-h-[16vh] flex flex-col items-center justify-center py-6 sm:py-10 md:py-18 px-8 sm:px-10 md:px-12"
      : "rounded-2xl ring-1 ring-white/10 ring-inset bg-white/10 backdrop-blur-sm shadow-lg w-full h-full min-h-[16vh] flex flex-col items-center justify-center py-6 sm:py-10 md:py-18 px-8 sm:px-10 md:px-12";

  return (
    <article
      className={cardClasses}
      aria-labelledby={`counter-title-${title.replace(/\s/g, "-")}`}
    >
      <h2
        id={`counter-title-${title.replace(/\s/g, "-")}`}
        className="text-xl md:text-3xl font-semibold text-white/95 mb-4 sm:mb-5 text-center tracking-tight"
      >
        {title}
      </h2>

      <div className="text-center w-full min-h-[4.5rem] flex flex-col items-center justify-center gap-1 mb-4 sm:mb-6 flex-1">
        {hasDateTimeSplit && datePart != null && timePart != null ? (
          <>
            <span className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight tabular-nums">
              {datePart}
            </span>
            <span className="text-base sm:text-lg md:text-xl font-medium text-white/80 tabular-nums">
              {timePart}
            </span>
          </>
        ) : (
          <span className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tabular-nums">
            {children}
          </span>
        )}
      </div>

      {showLink && (
        <Link
          to={route}
          className="rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium px-5 py-2.5 transition-colors focus-visible:ring-2 focus-visible:ring-white/50 inline-block text-center min-h-[44px] flex items-center justify-center text-sm sm:text-base"
        >
          {buttonLabel}
        </Link>
      )}
    </article>
  );
}
