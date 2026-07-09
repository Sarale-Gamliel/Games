import { useState } from 'react'
import { CHOICES, getRandomChoice, getRoundResult } from '../utils/rpsLogic.js'
import Confetti from '../components/Confetti.jsx'
import './RockPaperScissors.css'

const REVEAL_DELAY_MS = 500

function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [scores, setScores] = useState({ player: 0, computer: 0, draw: 0 })
  const [isRevealing, setIsRevealing] = useState(false)

  function handlePick(choiceId) {
    if (isRevealing) return
    setPlayerChoice(choiceId)
    setComputerChoice(null)
    setResult(null)
    setIsRevealing(true)

    setTimeout(() => {
      const computerPick = getRandomChoice()
      const roundResult = getRoundResult(choiceId, computerPick)
      setComputerChoice(computerPick)
      setResult(roundResult)
      setScores((s) => ({ ...s, [roundResult]: s[roundResult] + 1 }))
      setIsRevealing(false)
    }, REVEAL_DELAY_MS)
  }

  function handleReset() {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setScores({ player: 0, computer: 0, draw: 0 })
  }

  const iconOf = (id) => CHOICES.find((c) => c.id === id)?.icon

  let statusText = 'בחרו יד כדי להתחיל'
  if (isRevealing) statusText = 'המחשב בוחר... 🤔'
  else if (result === 'player') statusText = '🎉 ניצחתם!'
  else if (result === 'computer') statusText = '😢 המחשב ניצח'
  else if (result === 'draw') statusText = '🤝 תיקו!'

  return (
    <main className="page rps-page">
      <div className="rps-header">
        <h1>אבן נייר ומספריים</h1>
        <p className="rps-status">{statusText}</p>
      </div>

      <div className="rps-scoreboard">
        <div className="rps-score">אתם: {scores.player}</div>
        <div className="rps-score">תיקו: {scores.draw}</div>
        <div className="rps-score">מחשב: {scores.computer}</div>
      </div>

      <div className="rps-board">
        <Confetti active={result === 'player'} />

        <div className="rps-arena">
          <div className={`rps-hand ${isRevealing ? 'thinking' : ''}`}>
            <span className="rps-hand-icon">{playerChoice ? iconOf(playerChoice) : '❔'}</span>
            <span className="rps-hand-label">אתם</span>
          </div>
          <span className="rps-vs">VS</span>
          <div className={`rps-hand ${isRevealing ? 'thinking' : ''}`}>
            <span className="rps-hand-icon">{computerChoice ? iconOf(computerChoice) : '❔'}</span>
            <span className="rps-hand-label">מחשב</span>
          </div>
        </div>

        <div className="rps-choices">
          {CHOICES.map((choice) => (
            <button
              key={choice.id}
              className={`rps-choice ${playerChoice === choice.id ? 'selected' : ''}`}
              onClick={() => handlePick(choice.id)}
              disabled={isRevealing}
            >
              <span>{choice.icon}</span>
              {choice.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rps-actions">
        <button className="rps-reset" onClick={handleReset}>
          איפוס ניקוד
        </button>
      </div>
    </main>
  )
}

export default RockPaperScissors
