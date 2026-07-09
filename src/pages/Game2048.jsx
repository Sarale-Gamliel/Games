import { useEffect, useState } from 'react'
import {
  createInitialGrid,
  addRandomTile,
  move,
  hasAvailableMoves,
  hasReached2048,
} from '../utils/game2048Logic.js'
import Confetti from '../components/Confetti.jsx'
import './Game2048.css'

const KEY_TO_DIRECTION = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

function Game2048() {
  const [grid, setGrid] = useState(createInitialGrid)
  const [score, setScore] = useState(0)
  const [moveCount, setMoveCount] = useState(0)
  const [wonDismissed, setWonDismissed] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const isWinner = hasReached2048(grid) && !wonDismissed
  const isGameOver = !hasAvailableMoves(grid)

  function applyMove(direction) {
    if (isGameOver) return
    const result = move(grid, direction)
    if (!result.moved) return

    const nextGrid = addRandomTile(result.grid)
    setGrid(nextGrid)
    setScore((s) => s + result.scoreGained)
    setMoveCount((m) => m + 1)
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const direction = KEY_TO_DIRECTION[e.key]
      if (!direction) return
      e.preventDefault()
      applyMove(direction)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, isGameOver])

  function handleTouchStart(e) {
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
  }

  function handleTouchEnd(e) {
    if (!touchStart) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - touchStart.x
    const dy = touch.clientY - touchStart.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    if (Math.max(absDx, absDy) < 24) return
    if (absDx > absDy) applyMove(dx > 0 ? 'right' : 'left')
    else applyMove(dy > 0 ? 'down' : 'up')
    setTouchStart(null)
  }

  function handleReset() {
    setGrid(createInitialGrid())
    setScore(0)
    setMoveCount(0)
    setWonDismissed(false)
  }

  return (
    <main className="page g2048-page">
      <div className="g2048-header">
        <h1>2048</h1>
        <p className="g2048-score">ניקוד: {score}</p>
      </div>

      <div
        className="g2048-board"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Confetti active={isWinner} />

        {isWinner && (
          <div className="g2048-overlay">
            <p>🎉 הגעתם ל-2048!</p>
            <button onClick={() => setWonDismissed(true)}>המשיכו לשחק</button>
          </div>
        )}

        {isGameOver && (
          <div className="g2048-overlay">
            <p>😢 אין יותר מהלכים אפשריים</p>
            <span className="g2048-overlay-score">ניקוד סופי: {score}</span>
          </div>
        )}

        <div className="g2048-grid">
          {grid.map((row, r) =>
            row.map((value, c) => (
              <div key={`${r}-${c}`} className="g2048-tile-slot">
                {value !== 0 && (
                  <div key={`${r}-${c}-${value}-${moveCount}`} className={`g2048-tile v${value}`}>
                    {value}
                  </div>
                )}
              </div>
            )),
          )}
        </div>
      </div>

      <div className="g2048-actions">
        <button className="g2048-reset" onClick={handleReset}>
          משחק חדש
        </button>
      </div>
    </main>
  )
}

export default Game2048
