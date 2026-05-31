import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MemoryGamePhoto } from "../../data/memoryGamePhotos";

type CardModel = {
  uid: string;
  pairId: number;
  src: string;
  alt: string;
};

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildDeck(photos: MemoryGamePhoto[]): CardModel[] {
  return shuffle(
    photos.flatMap((p, pairId) => [
      { uid: `${pairId}-a`, pairId, src: p.src, alt: p.alt },
      { uid: `${pairId}-b`, pairId, src: p.src, alt: p.alt },
    ])
  );
}

type MemoryGameProps = {
  photos: MemoryGamePhoto[];
  /** Chamado quando o jogo passa a estar completo ou deixa de estar (ex.: Recomeçar). */
  onWinChange?: (won: boolean) => void;
};

const FLIP_BACK_MS = 750;

/**
 * Jogo da memória com pares de fotos; acessível via botões e estados anunciados.
 */
export function MemoryGame({ photos, onWinChange }: MemoryGameProps) {
  const pairCount = photos.length;
  const [deck, setDeck] = useState<CardModel[]>(() => buildDeck(photos));
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(() => new Set());
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const won = matchedPairs.size === pairCount && pairCount > 0;

  useEffect(() => {
    onWinChange?.(won);
  }, [won, onWinChange]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const restart = useCallback(() => {
    if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
    setDeck(buildDeck(photos));
    setFlippedUids([]);
    setMatchedPairs(new Set());
    setLocked(false);
    setMoves(0);
  }, [photos]);

  const handleFlip = useCallback(
    (card: CardModel) => {
      if (locked || won) return;
      if (matchedPairs.has(card.pairId)) return;
      if (flippedUids.includes(card.uid)) return;
      if (flippedUids.length >= 2) return;

      const nextFlipped = [...flippedUids, card.uid];
      setFlippedUids(nextFlipped);

      if (nextFlipped.length < 2) return;

      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;
      const cardA = deck.find((c) => c.uid === a);
      const cardB = deck.find((c) => c.uid === b);
      if (cardA == null || cardB == null) return;

      if (cardA.pairId === cardB.pairId) {
        setMatchedPairs((prev) => new Set(prev).add(cardA.pairId));
        setFlippedUids([]);
        return;
      }

      setLocked(true);
      timeoutRef.current = setTimeout(() => {
        setFlippedUids([]);
        setLocked(false);
        timeoutRef.current = null;
      }, FLIP_BACK_MS);
    },
    [deck, flippedUids, locked, matchedPairs, won]
  );

  const gridCols = useMemo(() => {
    if (pairCount <= 4) return "grid-cols-4";
    if (pairCount <= 6) return "grid-cols-4 md:grid-cols-4";
    return "grid-cols-4 lg:grid-cols-6";
  }, [pairCount]);

  if (pairCount < 2) {
    return (
      <p className="rounded-2xl border border-white/15 bg-white/10 p-6 text-center text-white/85">
        Adiciona pelo menos 2 fotos em <code className="text-rose-200">memoryGamePhotos.ts</code> para
        jogar.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
        <span>
          Pares:{" "}
          <strong className="text-white tabular-nums">
            {matchedPairs.size}/{pairCount}
          </strong>
        </span>
        <span>
          Jogadas: <strong className="text-white tabular-nums">{moves}</strong>
        </span>
        <button
          type="button"
          onClick={restart}
          className="rounded-xl bg-white/15 px-4 py-2 font-medium text-white transition hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white/50"
        >
          Recomeçar
        </button>
      </div>

      <div
        className={`grid gap-2 sm:gap-4 ${gridCols}`}
        role="grid"
        aria-label="Cartas do jogo da memória"
      >
        {deck.map((card) => {
          const isMatched = matchedPairs.has(card.pairId);
          const isFlipped = isMatched || flippedUids.includes(card.uid);
          const showFace = isFlipped;

          return (
            <div key={card.uid} role="gridcell" className="aspect-square">
              <button
                type="button"
                onClick={() => handleFlip(card)}
                disabled={locked || isMatched || (flippedUids.length >= 2 && !isFlipped)}
                aria-pressed={showFace}
                aria-label={
                  isMatched
                    ? `Par encontrado: ${card.alt}`
                    : showFace
                      ? card.alt
                      : "Carta virada para baixo"
                }
                className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 shadow-lg transition-[transform,box-shadow,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/80 enabled:hover:scale-[1.04] enabled:hover:border-white/45 enabled:hover:shadow-xl enabled:hover:shadow-rose-950/30 motion-reduce:transition-none motion-reduce:enabled:hover:scale-100 disabled:cursor-default"
              >
                <span
                  className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/90 to-indigo-950/95 text-3xl text-rose-300/50 transition-opacity duration-300 motion-reduce:transition-none ${
                    showFace ? "opacity-0" : "opacity-100"
                  }`}
                  aria-hidden
                >
                  ♥
                </span>
                <span
                  className={`block h-full w-full transition-opacity duration-300 motion-reduce:transition-none ${
                    showFace ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={card.src}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </button>
            </div>
          );
        })}
      </div>

      
    </div>
  );
}
