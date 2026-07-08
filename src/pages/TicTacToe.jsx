import { useEffect, useState } from 'react'
import { getWinner, isDraw } from '../utils/ticTacToeLogic.js'
import { getComputerMove } from '../utils/ticTacToeAI.js'
import './TicTacToe.css'

const EMPTY_BOARD = Array(9).fill(null)
const COMPUTER_DELAY_MS = 500

function TicTacToe() {
  const [mode, setMode] = useState('friend') // 'friend' | 'computer'
  const [board, setBoard] = useState(EMPTY_BOARD)
  const [isXTurn, setIsXTurn] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })

  const result = getWinner(board)
  const draw = !result && isDraw(board)
  const gameOver = Boolean(result) || draw
  const computerTurn = mode === 'computer' && !isXTurn && !gameOver

  function playMove(index, player) {
    const nextBoard = [...board]
    nextBoard[index] = player
    setBoard(nextBoard)

    const nextResult = getWinner(nextBoard)
    if (nextResult) {
      setScores((s) => ({ ...s, [nextResult.player]: s[nextResult.player] + 1 }))
    } else if (isDraw(nextBoard)) {
      setScores((s) => ({ ...s, draw: s.draw + 1 }))
    }

    setIsXTurn((prev) => !prev)
  }

  function handleCellClick(index) {
    if (board[index] || gameOver || computerTurn) return
    playMove(index, isXTurn ? 'X' : 'O')
  }

  useEffect(() => {
    if (!computerTurn) return
    const timer = setTimeout(() => {
      const move = getComputerMove(board)
      if (move !== null) playMove(move, 'O')
    }, COMPUTER_DELAY_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computerTurn, board])

  function handleReset() {
    setBoard(EMPTY_BOARD)
    setIsXTurn(true)
  }

  function handleModeChange(nextMode) {
    setMode(nextMode)
    handleReset()
  }

  let statusText = `תור השחקן ${isXTurn ? 'X' : 'O'}`
  if (computerTurn) statusText = 'המחשב חושב... 🤔'
  else if (result) statusText = `🎉 השחקן ${result.player} ניצח!`
  else if (draw) statusText = '🤝 תיקו!'

  return (
    <main className="page xo-page">
      <div className="xo-header">
        <h1>איקס עיגול</h1>

        <div className="xo-mode-toggle">
          <button
            className={mode === 'friend' ? 'active' : ''}
            onClick={() => handleModeChange('friend')}
          >
            🧑‍🤝‍🧑 שני שחקנים
          </button>
          <button
            className={mode === 'computer' ? 'active' : ''}
            onClick={() => handleModeChange('computer')}
          >
            🤖 נגד המחשב
          </button>
        </div>

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
            disabled={Boolean(cell) || gameOver || computerTurn}
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
