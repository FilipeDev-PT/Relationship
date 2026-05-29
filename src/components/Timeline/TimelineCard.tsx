import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import type { TimelineEntry } from "./types";

type TimelineCardProps = {
  entry: TimelineEntry;
  /** Índice para atraso visual escalonado */
  index: number;
  /** Último item: sem espaço extra embaixo */
  isLast: boolean;
};

/**
 * Card reutilizável para um momento da linha do tempo.
 * Revela suavemente ao rolar; pode incluir fotos ou só texto.
 */
export function TimelineCard({ entry, index, isLast }: TimelineCardProps) {
  const [setRef, revealed] = useRevealOnScroll<HTMLLIElement>();
  const delayMs = index * 70;

  return (
    <li
      ref={setRef}
      className={`relative pl-9 sm:pl-11 ${isLast ? "pb-4" : "pb-12 sm:pb-14"}`}
    >
      <span
        className={`absolute left-0 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-br from-rose-400 to-purple-500 shadow-[0_0_0_4px_rgba(255,255,255,0.08)] transition-all duration-500 ease-out motion-reduce:scale-100 ${
          revealed ? "scale-100 opacity-100" : "scale-75 opacity-40"
        }`}
        aria-hidden
      />

      <article
        className={`rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:p-5 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        style={{ transitionDelay: revealed ? `${delayMs}ms` : "0ms" }}
        aria-labelledby={`timeline-${entry.id}-title`}
      >
        <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-white/10 pb-3">
          <time
            {...(entry.dateIso != null ? { dateTime: entry.dateIso } : {})}
            className="text-sm font-medium tracking-wide text-rose-200/95"
          >
            {entry.date}
          </time>
        </div>

        <h2
          id={`timeline-${entry.id}-title`}
          className="text-lg font-semibold leading-snug text-white sm:text-xl"
        >
          {entry.title}
        </h2>

        {entry.description != null && entry.description !== "" && (
          <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
            {entry.description}
          </p>
        )}

        {entry.images != null && entry.images.length > 0 && (
          <ul
            className={`mt-4 grid list-none gap-2 ${entry.images.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
          >
            {entry.images.map((img, imgIndex) => (
              <li key={`${entry.id}-img-${imgIndex}`} className="overflow-hidden rounded-xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-auto w-full max-h-64 object-cover transition-transform duration-500 hover:scale-[1.02] motion-reduce:hover:scale-100"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}
