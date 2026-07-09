import { useState } from 'react'
import { createShuffledDeck } from '../utils/memoryDeck.js'
import Confetti from '../components/Confetti.jsx'
import './Memory.css'

const MISMATCH_DELAY_MS = 700

function Memory() {
  const [deck, setDeck] = useState(createShuffledDeck)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)

  const isWinner = matched.length === deck.length / 2

  function handleCardClick(card) {
    if (locked || flipped.includes(card.id) || matched.includes(card.pairIndex)) return

    const nextFlipped = [...flipped, card.id]
    setFlipped(nextFlipped)

    if (nextFlipped.length !== 2) return

    setMoves((m) => m + 1)
    const [firstId, secondId] = nextFlipped
    const first = deck.find((c) => c.id === firstId)
    const second = deck.find((c) => c.id === secondId)

    if (first.pairIndex === second.pairIndex) {
      setMatched((current) => [...current, first.pairIndex])
      setFlipped([])
      return
    }

    setLocked(true)
    setTimeout(() => {
      setFlipped([])
      setLocked(false)
    }, MISMATCH_DELAY_MS)
  }

  function handleReset() {
    setDeck(createShuffledDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setLocked(false)
  }

  return (
    <main className="page memory-page">
      <div className="memory-header">
        <h1>זיכרון</h1>
        <p className="memory-status">
          {isWinner ? '🎉 מצאתם את כל הזוגות!' : `מהלכים: ${moves}`}
        </p>
      </div>

      <div className="memory-board">
        <Confetti active={isWinner} />
        <div className="memory-grid">
          {deck.map((card) => {
            const isFaceUp = flipped.includes(card.id) || matched.includes(card.pairIndex)
            return (
              <button
                key={card.id}
                className={`memory-card ${isFaceUp ? 'face-up' : ''} ${
                  matched.includes(card.pairIndex) ? 'matched' : ''
                }`}
                onClick={() => handleCardClick(card)}
                disabled={isFaceUp}
                aria-label="קלף"
              >
                <span className="memory-card-inner">
                  <span className="memory-card-back">?</span>
                  <span className="memory-card-front">{card.symbol}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="memory-actions">
        <button className="memory-reset" onClick={handleReset}>
          {isWinner ? 'משחק חדש' : 'ערבוב מחדש'}
        </button>
      </div>
    </main>
  )
}

export default Memory
