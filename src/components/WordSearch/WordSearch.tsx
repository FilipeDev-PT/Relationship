import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  generateWordSearch,
  type PlacedWord,
} from "../../utils/wordSearchGenerator";

interface WordSearchProps {
  words: string[];
  gridSize: number;
  onComplete?: () => void;
}

type CellCoord = [number, number];

function coordKey(r: number, c: number) {
  return `${r},${c}`;
}

function getCellsBetween(
  start: CellCoord,
  end: CellCoord
): CellCoord[] | null {
  const [r1, c1] = start;
  const [r2, c2] = end;
  const dr = r2 - r1;
  const dc = c2 - c1;

  if (dr === 0 && dc === 0) return [[r1, c1]];

  const absDr = Math.abs(dr);
  const absDc = Math.abs(dc);

  if (dr !== 0 && dc !== 0 && absDr !== absDc) return null;

  const steps = Math.max(absDr, absDc);
  const stepR = dr === 0 ? 0 : dr / steps;
  const stepC = dc === 0 ? 0 : dc / steps;

  const cells: CellCoord[] = [];
  for (let i = 0; i <= steps; i++) {
    cells.push([r1 + stepR * i, c1 + stepC * i]);
  }
  return cells;
}

function getCellFromPoint(clientX: number, clientY: number): CellCoord | null {
  const el = document.elementFromPoint(clientX, clientY)?.closest("[data-cell-row]");
  if (!(el instanceof HTMLElement)) return null;
  const r = Number(el.dataset.cellRow);
  const c = Number(el.dataset.cellCol);
  if (Number.isNaN(r) || Number.isNaN(c)) return null;
  return [r, c];
}

export function WordSearch({ words, gridSize, onComplete }: WordSearchProps) {
  const { grid, placedWords } = useMemo(
    () => generateWordSearch(words, gridSize),
    [words, gridSize]
  );

  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [selecting, setSelecting] = useState(false);
  const [selStart, setSelStart] = useState<CellCoord | null>(null);
  const [selEnd, setSelEnd] = useState<CellCoord | null>(null);
  const [highlightCells, setHighlightCells] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const completeFired = useRef(false);

  const allFound = foundWords.size === placedWords.length;

  useEffect(() => {
    if (allFound && !completeFired.current) {
      completeFired.current = true;
      onComplete?.();
    }
  }, [allFound, onComplete]);

  const currentSelection = useMemo(() => {
    if (!selStart || !selEnd) return [];
    return getCellsBetween(selStart, selEnd) ?? [];
  }, [selStart, selEnd]);

  const checkSelection = useCallback(
    (cells: CellCoord[]) => {
      const selectedLetters = cells.map(([r, c]) => grid[r][c]).join("");
      const reversed = [...selectedLetters].reverse().join("");

      let match: PlacedWord | undefined;
      for (const pw of placedWords) {
        if (foundWords.has(pw.word)) continue;
        const pwLetters = pw.cells.map(([r, c]) => grid[r][c]).join("");
        if (selectedLetters === pwLetters || reversed === pwLetters) {
          match = pw;
          break;
        }
      }

      if (match) {
        setFoundWords((prev) => new Set(prev).add(match!.word));
        setFoundCells((prev) => {
          const next = new Set(prev);
          cells.forEach(([r, c]) => next.add(coordKey(r, c)));
          return next;
        });

        setHighlightCells(new Set(cells.map(([r, c]) => coordKey(r, c))));
        setTimeout(() => setHighlightCells(new Set()), 600);
      }
    },
    [grid, placedWords, foundWords]
  );

  const updateSelectionEnd = useCallback((cell: CellCoord) => {
    setSelEnd(cell);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, r: number, c: number) => {
      if (allFound) return;
      e.preventDefault();
      gridRef.current?.setPointerCapture(e.pointerId);
      setSelecting(true);
      setSelStart([r, c]);
      setSelEnd([r, c]);
    },
    [allFound]
  );

  const handleGridPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!selecting) return;
      const cell = getCellFromPoint(e.clientX, e.clientY);
      if (cell) updateSelectionEnd(cell);
    },
    [selecting, updateSelectionEnd]
  );

  const handlePointerUp = useCallback(() => {
    if (!selecting) return;
    setSelecting(false);
    if (currentSelection.length > 1) {
      checkSelection(currentSelection);
    }
    setSelStart(null);
    setSelEnd(null);
  }, [selecting, currentSelection, checkSelection]);

  useEffect(() => {
    const up = () => {
      if (selecting) handlePointerUp();
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [selecting, handlePointerUp]);

  const selectionSet = useMemo(
    () => new Set(currentSelection.map(([r, c]) => coordKey(r, c))),
    [currentSelection]
  );

  return (
    <div className="flex w-full flex-col items-center gap-5 sm:gap-6">
      <div
        ref={gridRef}
        className="relative w-full max-w-[min(100%,22rem)] touch-none select-none overscroll-contain sm:max-w-xs"
        style={{ touchAction: "none" }}
        onPointerMove={handleGridPointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="grid w-full gap-0.5 sm:gap-1"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const key = coordKey(r, c);
              const isFound = foundCells.has(key);
              const isSelecting = selectionSet.has(key);
              const isHighlight = highlightCells.has(key);

              return (
                <button
                  key={key}
                  type="button"
                  data-cell-row={r}
                  data-cell-col={c}
                  className={`flex aspect-square w-full min-w-0 cursor-pointer items-center justify-center rounded-sm text-[0.65rem] font-bold leading-none transition-all duration-200 min-[380px]:text-xs sm:rounded sm:text-sm ${
                    isHighlight
                      ? "scale-105 bg-green-500/80 text-white shadow-lg sm:scale-110"
                      : isFound
                        ? "bg-rose-500/60 text-white"
                        : isSelecting
                          ? "scale-105 bg-purple-500/50 text-white"
                          : "bg-white/10 text-white/90 active:bg-white/25 sm:hover:bg-white/20"
                  }`}
                  onPointerDown={(e) => handlePointerDown(e, r, c)}
                  aria-label={letter}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="w-full max-w-sm px-1">
        <p className="mb-2 text-center text-[0.65rem] font-medium uppercase tracking-widest text-white/50 min-[380px]:text-xs">
          Palavras para encontrar
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {placedWords.map((pw) => (
            <span
              key={pw.word}
              className={`rounded-full px-2.5 py-1 text-[0.65rem] font-medium transition-all duration-300 min-[380px]:px-3 min-[380px]:text-xs sm:text-sm ${
                foundWords.has(pw.word)
                  ? "bg-rose-500/30 text-white line-through opacity-70"
                  : "bg-white/10 text-white/80"
              }`}
            >
              {pw.word}
            </span>
          ))}
        </div>
      </div>

      {allFound && (
        <p className="max-w-xs px-2 text-center text-sm font-semibold text-green-400 sm:text-base">
          Parabéns! Encontraste todas as palavras!
        </p>
      )}
    </div>
  );
}
