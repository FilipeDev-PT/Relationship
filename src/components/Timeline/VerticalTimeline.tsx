import { TimelineCard } from "./TimelineCard";
import type { TimelineEntry } from "./types";

type VerticalTimelineProps = {
  entries: TimelineEntry[];
  /** Rótulo acessível para a lista (ex.: marcos do aniversário) */
  ariaLabel: string;
};

/**
 * Linha do tempo vertical com trilho e nós; cada item é um `TimelineCard`.
 */
export function VerticalTimeline({ entries, ariaLabel }: VerticalTimelineProps) {
  if (entries.length === 0) return null;

  return (
    <div className="relative">
      <div
        className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-white/35 via-white/20 to-white/10 sm:left-[7px]"
        aria-hidden
      />

      <ol className="relative list-none" aria-label={ariaLabel}>
        {entries.map((entry, index) => (
          <TimelineCard
            key={entry.id}
            entry={entry}
            index={index}
            isLast={index === entries.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}
