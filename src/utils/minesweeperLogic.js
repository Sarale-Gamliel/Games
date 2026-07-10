export const ROWS = 9
export const COLS = 9
export const MINE_COUNT = 10

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacent: 0,
    })),
  )
}

function getNeighbors(r, c) {
  const neighbors = []
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const nr = r + dr
      const nc = c + dc
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) neighbors.push([nr, nc])
    }
  }
  return neighbors
}

export function placeMines(excludeR, excludeC) {
  const board = createEmptyBoard()
  const excluded = new Set([`${excludeR},${excludeC}`, ...getNeighbors(excludeR, excludeC).map(([r, c]) => `${r},${c}`)])

  let placed = 0
  while (placed < MINE_COUNT) {
    const r = Math.floor(Math.random() * ROWS)
    const c = Math.floor(Math.random() * COLS)
    if (excluded.has(`${r},${c}`) || board[r][c].isMine) continue
    board[r][c].isMine = true
    placed += 1
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].isMine) continue
      board[r][c].adjacent = getNeighbors(r, c).filter(([nr, nc]) => board[nr][nc].isMine).length
    }
  }

  return board
}

export function revealCell(board, startR, startC) {
  const next = board.map((row) => row.map((cell) => ({ ...cell })))
  const stack = [[startR, startC]]

  while (stack.length > 0) {
    const [r, c] = stack.pop()
    const cell = next[r][c]
    if (cell.isRevealed || cell.isFlagged) continue
    cell.isRevealed = true
    if (cell.adjacent === 0 && !cell.isMine) {
      getNeighbors(r, c).forEach(([nr, nc]) => {
        if (!next[nr][nc].isRevealed) stack.push([nr, nc])
      })
    }
  }

  return next
}

export function revealAllMines(board) {
  return board.map((row) =>
    row.map((cell) => (cell.isMine ? { ...cell, isRevealed: true } : cell)),
  )
}

export function toggleFlag(board, r, c) {
  const next = board.map((row) => row.map((cell) => ({ ...cell })))
  next[r][c].isFlagged = !next[r][c].isFlagged
  return next
}

export function checkWin(board) {
  return board.every((row) => row.every((cell) => cell.isMine || cell.isRevealed))
}

export function countFlags(board) {
  return board.reduce((sum, row) => sum + row.filter((cell) => cell.isFlagged).length, 0)
}
