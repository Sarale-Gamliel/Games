import { useEffect, useRef, useState } from 'react'
import {
  ROWS,
  COLS,
  MINE_COUNT,
  placeMines,
  revealCell,
  revealAllMines,
  toggleFlag,
  checkWin,
  countFlags,
} from '../utils/minesweeperLogic.js'
import './Minesweeper.css'

const NUMBER_COLORS = {
  1: '#2563eb',
  2: '#16a34a',
  3: '#dc2626',
  4: '#7c3aed',
  5: '#92400e',
  6: '#0891b2',
  7: '#1e293b',
  8: '#64748b',
}

function createHiddenBoard() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacent: 0,
    })),
  )
}

function Minesweeper() {
  const [board, setBoard] = useState(createHiddenBoard)
  const [started, setStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const [flagMode, setFlagMode] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (started && !gameOver && !isWinner) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
      return () => clearInterval(intervalRef.current)
    }
  }, [started, gameOver, isWinner])

  function handleReveal(r, c) {
    if (gameOver || isWinner) return
    if (board[r][c].isFlagged) return

    let currentBoard = board
    if (!started) {
      currentBoard = placeMines(r, c)
      setStarted(true)
    }

    if (currentBoard[r][c].isMine) {
      setBoard(revealAllMines(currentBoard))
      setGameOver(true)
      return
    }

    const revealed = revealCell(currentBoard, r, c)
    setBoard(revealed)
    if (checkWin(revealed)) setIsWinner(true)
  }

  function handleFlag(r, c) {
    if (gameOver || isWinner || board[r][c].isRevealed) return
    setBoard(toggleFlag(board, r, c))
  }

  function handleCellClick(r, c) {
    if (flagMode) handleFlag(r, c)
    else handleReveal(r, c)
  }

  function handleContextMenu(e, r, c) {
    e.preventDefault()
    handleFlag(r, c)
  }

  function handleReset() {
    setBoard(createHiddenBoard())
    setStarted(false)
    setGameOver(false)
    setIsWinner(false)
    setSeconds(0)
  }

  const flagsRemaining = MINE_COUNT - countFlags(board)

  let statusText = 'לחצו על משבצת כדי להתחיל'
  if (isWinner) statusText = '🎉 פינית את כל השדה!'
  else if (gameOver) statusText = '💥 פגעתם במוקש'
  else if (started) statusText = flagMode ? 'מצב סימון דגל 🚩' : 'לחצו לגילוי משבצת'

  return (
    <main className="page mine-page">
      <div className="mine-header">
        <h1>שדה מוקשים</h1>
        <p className="mine-status">{statusText}</p>
      </div>

      <div className="mine-scoreboard">
        <div className="mine-score">🚩 {flagsRemaining}</div>
        <div className="mine-score">⏱️ {seconds}</div>
        <button
          className={`mine-mode-toggle ${flagMode ? 'active' : ''}`}
          onClick={() => setFlagMode((f) => !f)}
        >
          {flagMode ? '🚩 סימון' : '🔍 גילוי'}
        </button>
      </div>

      <div className="mine-board">
        {board.map((row, r) => (
          <div className="mine-row" key={r}>
            {row.map((cell, c) => {
              let content = ''
              if (cell.isFlagged) content = '🚩'
              else if (cell.isRevealed) {
                if (cell.isMine) content = '💣'
                else if (cell.adjacent > 0) content = cell.adjacent
              }
              return (
                <button
                  key={c}
                  className={`mine-cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isMine && cell.isRevealed ? 'mine' : ''}`}
                  style={{ color: NUMBER_COLORS[cell.adjacent] }}
                  onClick={() => handleCellClick(r, c)}
                  onContextMenu={(e) => handleContextMenu(e, r, c)}
                  disabled={gameOver || isWinner}
                >
                  {content}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mine-actions">
        <button className="mine-reset" onClick={handleReset}>
          משחק חדש
        </button>
      </div>
    </main>
  )
}

export default Minesweeper
