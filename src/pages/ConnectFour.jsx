import { useEffect, useState } from 'react'
import {
  ROWS,
  COLS,
  createEmptyBoard,
  getOpenRow,
  dropPiece,
  getValidColumns,
  isBoardFull,
  checkWinner,
} from '../utils/connectFourLogic.js'
import { getComputerColumn } from '../utils/connectFourAI.js'
import Confetti from '../components/Confetti.jsx'
import './ConnectFour.css'

const HUMAN = 'R'
const COMPUTER = 'Y'
const COMPUTER_DELAY_MS = 500

function ConnectFour() {
  const [mode, setMode] = useState('friend') // 'friend' | 'computer'
  const [board, setBoard] = useState(createEmptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState(HUMAN)
  const [scores, setScores] = useState({ R: 0, Y: 0, draw: 0 })

  const winner = checkWinner(board)
  const draw = !winner && isBoardFull(board)
  const gameOver = Boolean(winner) || draw
  const computerTurn = mode === 'computer' && currentPlayer === COMPUTER && !gameOver

  function playColumn(col, player) {
    const row = getOpenRow(board, col)
    if (row === -1) return
    const nextBoard = dropPiece(board, row, col, player)
    setBoard(nextBoard)

    const nextWinner = checkWinner(nextBoard)
    if (nextWinner) {
      setScores((s) => ({ ...s, [nextWinner.player]: s[nextWinner.player] + 1 }))
    } else if (isBoardFull(nextBoard)) {
      setScores((s) => ({ ...s, draw: s.draw + 1 }))
    }

    setCurrentPlayer((prev) => (prev === 'R' ? 'Y' : 'R'))
  }

  function handleColumnClick(col) {
    if (gameOver || computerTurn) return
    playColumn(col, currentPlayer)
  }

  useEffect(() => {
    if (!computerTurn) return
    const timer = setTimeout(() => {
      const validCols = getValidColumns(board)
      if (validCols.length === 0) return
      const col = getComputerColumn(board, COMPUTER, HUMAN)
      playColumn(col, COMPUTER)
    }, COMPUTER_DELAY_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computerTurn, board])

  function handleReset() {
    setBoard(createEmptyBoard())
    setCurrentPlayer(HUMAN)
  }

  function handleModeChange(nextMode) {
    setMode(nextMode)
    handleReset()
  }

  let statusText = `תור השחקן ${currentPlayer === 'R' ? 'אדום 🔴' : 'צהוב 🟡'}`
  if (computerTurn) statusText = 'המחשב חושב... 🤔'
  else if (winner) statusText = `🎉 ${winner.player === 'R' ? 'אדום' : 'צהוב'} ניצח!`
  else if (draw) statusText = '🤝 תיקו!'

  return (
    <main className="page c4-page">
      <div className="c4-header">
        <h1>ארבע בשורה</h1>

        <div className="c4-mode-toggle">
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

        <p className="c4-status">{statusText}</p>
      </div>

      <div className="c4-scoreboard">
        <div className="c4-score">🔴 {scores.R}</div>
        <div className="c4-score">תיקו: {scores.draw}</div>
        <div className="c4-score">🟡 {scores.Y}</div>
      </div>

      <div className="c4-board">
        <Confetti active={Boolean(winner)} />
        {Array.from({ length: COLS }, (_, colIndex) => (
          <button
            key={colIndex}
            className="c4-column"
            onClick={() => handleColumnClick(colIndex)}
            disabled={gameOver || computerTurn || board[0][colIndex] !== null}
            aria-label={`הפילו לעמודה ${colIndex + 1}`}
          >
            {Array.from({ length: ROWS }, (_, rowIndex) => {
              const cellPlayer = board[rowIndex][colIndex]
              const isWinningCell = winner?.cells.some(
                ([r, c]) => r === rowIndex && c === colIndex,
              )
              return (
                <span
                  key={rowIndex}
                  className={`c4-cell ${cellPlayer === 'R' ? 'red' : ''} ${
                    cellPlayer === 'Y' ? 'yellow' : ''
                  } ${isWinningCell ? 'winning' : ''}`}
                />
              )
            })}
          </button>
        ))}
      </div>

      <div className="c4-actions">
        <button className="c4-reset" onClick={handleReset}>
          {gameOver ? 'משחק חדש' : 'איפוס'}
        </button>
      </div>
    </main>
  )
}

export default ConnectFour
