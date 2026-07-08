import { getWinner, isDraw } from './ticTacToeLogic.js'

function minimax(board, isMaximizing) {
  const winner = getWinner(board)
  if (winner) return winner.player === 'O' ? 10 : -10
  if (isDraw(board)) return 0

  const scores = []
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue
    const nextBoard = [...board]
    nextBoard[i] = isMaximizing ? 'O' : 'X'
    scores.push(minimax(nextBoard, !isMaximizing))
  }

  return isMaximizing ? Math.max(...scores) : Math.min(...scores)
}

export function getComputerMove(board) {
  let bestScore = -Infinity
  let bestMove = null

  for (let i = 0; i < 9; i++) {
    if (board[i]) continue
    const nextBoard = [...board]
    nextBoard[i] = 'O'
    const score = minimax(nextBoard, false)
    if (score > bestScore) {
      bestScore = score
      bestMove = i
    }
  }

  return bestMove
}
