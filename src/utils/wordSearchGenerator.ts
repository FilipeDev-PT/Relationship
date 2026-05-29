type Direction = [number, number];

const DIRECTIONS: Direction[] = [
  [0, 1],   // horizontal →
  [1, 0],   // vertical ↓
  [1, 1],   // diagonal ↘
  [-1, 1],  // diagonal ↗
  [0, -1],  // horizontal ←
  [-1, 0],  // vertical ↑
  [-1, -1], // diagonal ↖
  [1, -1],  // diagonal ↙
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface PlacedWord {
  word: string;
  startRow: number;
  startCol: number;
  direction: Direction;
  cells: [number, number][];
}

export interface WordSearchGrid {
  grid: string[][];
  placedWords: PlacedWord[];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function canPlace(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dir: Direction,
  size: number
): boolean {
  for (let i = 0; i < word.length; i++) {
    const r = row + dir[0] * i;
    const c = col + dir[1] * i;
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    if (grid[r][c] !== "" && grid[r][c] !== word[i]) return false;
  }
  return true;
}

function placeWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dir: Direction
): [number, number][] {
  const cells: [number, number][] = [];
  for (let i = 0; i < word.length; i++) {
    const r = row + dir[0] * i;
    const c = col + dir[1] * i;
    grid[r][c] = word[i];
    cells.push([r, c]);
  }
  return cells;
}

/**
 * Gera uma grelha de caça-palavras com as palavras colocadas em posições
 * e direções aleatórias. Células vazias são preenchidas com letras aleatórias.
 */
export function generateWordSearch(
  words: string[],
  size: number
): WordSearchGrid {
  const grid: string[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "")
  );

  const placedWords: PlacedWord[] = [];
  const sortedWords = shuffle([...words]).sort((a, b) => b.length - a.length);

  for (const word of sortedWords) {
    let placed = false;
    const dirs = shuffle([...DIRECTIONS]);

    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const dir = dirs[attempt % dirs.length];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (canPlace(grid, word, row, col, dir, size)) {
        const cells = placeWord(grid, word, row, col, dir);
        placedWords.push({ word, startRow: row, startCol: col, direction: dir, cells });
        placed = true;
      }
    }
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      }
    }
  }

  return { grid, placedWords };
}
