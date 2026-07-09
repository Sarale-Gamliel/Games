import { ROWS, COLS, getOpenRow, dropPiece, getValidColumns, checkWinner } from './connectFourLogic.js'

const SEARCH_DEPTH = 4

function evaluateWindow(window, player, opponent) {
  const playerCount = window.filter((c) => c === player).length
  const emptyCount = window.filter((c) => c === null).length
  const oppCount = window.filter((c) => c === opponent).length

  if (playerCount === 4) return 100
  if (playerCount === 3 && emptyCount === 1) return 5
  if (playerCount === 2 && emptyCount === 2) return 2
  if (oppCount === 3 && emptyCount === 1) return -4
  return 0
}

function scorePosition(board, player) {
  const opponent = player === 'Y' ? 'R' : 'Y'
  let score = 0

  const centerCol = Math.floor(COLS / 2)
  score += board.filter((row) => row[centerCol] === player).length * 3

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      score += evaluateWindow(board[r].slice(c, c + 4), player, opponent)
    }
  }

  for (let c = 0; c < COLS; c++) {
    const column = board.map((row) => row[c])
    for (let r = 0; r <= ROWS - 4; r++) {
      score += evaluateWindow(column.slice(r, r + 4), player, opponent)
    }
  }

  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      score += evaluateWindow([0, 1, 2, 3].map((i) => board[r + i][c + i]), player, opponent)
    }
  }

  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      score += evaluateWindow([0, 1, 2, 3].map((i) => board[r - i][c + i]), player, opponent)
    }
  }

  return score
}

function minimax(board, depth, alpha, beta, maximizing, aiPlayer, humanPlayer) {
  const validCols = getValidColumns(board)
  const winner = checkWinner(board)

  if (winner || validCols.length === 0 || depth === 0) {
    if (winner) return { score: winner.player === aiPlayer ? 1_000_000 : -1_000_000 }
    if (validCols.length === 0) return { score: 0 }
    return { score: scorePosition(board, aiPlayer) }
  }

  const player = maximizing ? aiPlayer : humanPlayer
  let bestColumn = validCols[Math.floor(Math.random() * validCols.length)]
  let bestScore = maximizing ? -Infinity : Infinity

  for (const col of validCols) {
    const row = getOpenRow(board, col)
    const child = dropPiece(board, row, col, player)
    const { score } = minimax(child, depth - 1, alpha, beta, !maximizing, aiPlayer, humanPlayer)

    if (maximizing ? score > bestScore : score < bestScore) {
      bestScore = score
      bestColumn = col
    }

    if (maximizing) alpha = Math.max(alpha, bestScore)
    else beta = Math.min(beta, bestScore)
    if (alpha >= beta) break
  }

  return { column: bestColumn, score: bestScore }
}

export function getComputerColumn(board, aiPlayer, humanPlayer) {
  return minimax(board, SEARCH_DEPTH, -Infinity, Infinity, true, aiPlayer, humanPlayer).column
}
