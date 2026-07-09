export const ROWS = 6
export const COLS = 7
const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
]

export function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
}

export function getOpenRow(board, col) {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) return r
  }
  return -1
}

export function dropPiece(board, row, col, player) {
  const next = board.map((r) => [...r])
  next[row][col] = player
  return next
}

export function getValidColumns(board) {
  return Array.from({ length: COLS }, (_, c) => c).filter((c) => board[0][c] === null)
}

export function isBoardFull(board) {
  return board[0].every((cell) => cell !== null)
}

export function checkWinner(board) {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const player = board[r][c]
      if (!player) continue
      for (const [dr, dc] of DIRECTIONS) {
        const cells = [[r, c]]
        for (let k = 1; k < 4; k++) {
          const nr = r + dr * k
          const nc = c + dc * k
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== player) break
          cells.push([nr, nc])
        }
        if (cells.length === 4) return { player, cells }
      }
    }
  }
  return null
}
