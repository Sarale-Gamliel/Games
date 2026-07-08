import { useState } from 'react'
import { getWinner, isDraw } from '../utils/ticTacToeLogic.js'
import './TicTacToe.css'

const EMPTY_BOARD = Array(9).fill(null)

function TicTacToe() {
  const [board, setBoard] = useState(EMPTY_BOARD)
  const [isXTurn, setIsXTurn] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })

  const result = getWinner(board)
  const draw = !result && isDraw(board)
  const gameOver = Boolean(result) || draw

  function handleCellClick(index) {
    if (board[index] || gameOver) return

    const nextBoard = [...board]
    nextBoard[index] = isXTurn ? 'X' : 'O'
    setBoard(nextBoard)

    const nextResult = getWinner(nextBoard)
    if (nextResult) {
      setScores((s) => ({ ...s, [nextResult.player]: s[nextResult.player] + 1 }))
    } else if (isDraw(nextBoard)) {
      setScores((s) => ({ ...s, draw: s.draw + 1 }))
    }

    setIsXTurn((prev) => !prev)
  }

  function handleReset() {
    setBoard(EMPTY_BOARD)
    setIsXTurn(true)
  }

  let statusText = `תור השחקן ${isXTurn ? 'X' : 'O'}`
  if (result) statusText = `🎉 השחקן ${result.player} ניצח!`
  else if (draw) statusText = '🤝 תיקו!'

  return (
    <main className="page xo-page">
      <div className="xo-header">
        <h1>איקס עיגול</h1>
        <p className="xo-status">{statusText}</p>
      </div>

      <div className="xo-scoreboard">
        <div className="xo-score">X: {scores.X}</div>
        <div className="xo-score">תיקו: {scores.draw}</div>
        <div className="xo-score">O: {scores.O}</div>
      </div>

      <div className="xo-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`xo-cell ${cell === 'O' ? 'o' : ''} ${
              result?.line.includes(index) ? 'winning' : ''
            }`}
            onClick={() => handleCellClick(index)}
            disabled={Boolean(cell) || gameOver}
            aria-label={`משבצת ${index + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="xo-actions">
        <button className="xo-reset" onClick={handleReset}>
          {gameOver ? 'משחק חדש' : 'איפוס'}
        </button>
      </div>
    </main>
  )
}

export default TicTacToe
