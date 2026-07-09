import { useState } from 'react'
import { SIMON_COLORS, randomColorId } from '../utils/simonColors.js'
import './Simon.css'

const LIT_DURATION_MS = 450
const GAP_DURATION_MS = 200
const NEXT_ROUND_DELAY_MS = 600
const PRESS_FLASH_MS = 200

function Simon() {
  const [sequence, setSequence] = useState([])
  const [playerIndex, setPlayerIndex] = useState(0)
  const [litIndex, setLitIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [best, setBest] = useState(0)
  const [started, setStarted] = useState(false)

  function playSequence(seq) {
    setIsPlaying(true)
    let i = 0
    function step() {
      if (i >= seq.length) {
        setLitIndex(null)
        setIsPlaying(false)
        return
      }
      setLitIndex(seq[i])
      setTimeout(() => {
        setLitIndex(null)
        setTimeout(() => {
          i += 1
          step()
        }, GAP_DURATION_MS)
      }, LIT_DURATION_MS)
    }
    step()
  }

  function goToNextRound(currentSeq) {
    const next = [...currentSeq, randomColorId()]
    setSequence(next)
    setPlayerIndex(0)
    playSequence(next)
  }

  function startGame() {
    setStarted(true)
    setGameOver(false)
    setPlayerIndex(0)
    const first = [randomColorId()]
    setSequence(first)
    playSequence(first)
  }

  function handleColorClick(colorId) {
    if (isPlaying || gameOver || sequence.length === 0) return

    setLitIndex(colorId)
    setTimeout(() => setLitIndex(null), PRESS_FLASH_MS)

    if (sequence[playerIndex] === colorId) {
      if (playerIndex + 1 === sequence.length) {
        setBest((b) => Math.max(b, sequence.length))
        setTimeout(() => goToNextRound(sequence), NEXT_ROUND_DELAY_MS)
      } else {
        setPlayerIndex((p) => p + 1)
      }
    } else {
      setGameOver(true)
      setBest((b) => Math.max(b, sequence.length - 1))
    }
  }

  let statusText = 'לחצו "התחלה" כדי לשחק'
  if (gameOver) statusText = `😢 הפסדתם! הגעתם לרמה ${sequence.length - 1}`
  else if (isPlaying) statusText = 'עקבו אחרי הרצף... 👀'
  else if (started) statusText = `תורכם! רמה ${sequence.length}`

  return (
    <main className="page simon-page">
      <div className="simon-header">
        <h1>סיימון</h1>
        <p className="simon-status">{statusText}</p>
      </div>

      <div className="simon-scoreboard">
        <div className="simon-score">רמה נוכחית: {started && !gameOver ? sequence.length : 0}</div>
        <div className="simon-score">שיא הסשן: {best}</div>
      </div>

      <div className="simon-board">
        <div className="simon-grid">
          {SIMON_COLORS.map((color) => (
            <button
              key={color.id}
              className="simon-quad"
              style={{
                background: litIndex === color.id ? color.litHex : color.hex,
                boxShadow: litIndex === color.id ? `0 0 24px 4px ${color.litHex}` : 'none',
              }}
              onClick={() => handleColorClick(color.id)}
              disabled={isPlaying || gameOver || !started}
              aria-label={color.name}
            />
          ))}
        </div>

        {(!started || gameOver) && (
          <div className="simon-overlay">
            {gameOver && <p>הגעתם לרמה {sequence.length - 1}</p>}
            <button onClick={startGame}>{gameOver ? 'שחקו שוב' : 'התחלה'}</button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Simon
