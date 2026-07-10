import { useEffect, useState } from 'react'
import {
  WORD_LENGTH,
  MAX_GUESSES,
  HEBREW_KEYBOARD_ROWS,
  pickRandomWord,
  evaluateGuess,
  getKeyboardStatuses,
} from '../utils/wordleLogic.js'
import Confetti from '../components/Confetti.jsx'
import './Wordle.css'

function Wordle() {
  const [targetWord, setTargetWord] = useState(pickRandomWord)
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [shake, setShake] = useState(false)

  const isWinner = guesses.includes(targetWord)
  const isLoser = !isWinner && guesses.length >= MAX_GUESSES
  const gameOver = isWinner || isLoser
  const keyboardStatuses = getKeyboardStatuses(guesses, targetWord)

  function handleLetter(letter) {
    if (gameOver || currentGuess.length >= WORD_LENGTH) return
    setCurrentGuess((g) => g + letter)
  }

  function handleBackspace() {
    if (gameOver) return
    setCurrentGuess((g) => g.slice(0, -1))
  }

  function handleEnter() {
    if (gameOver) return
    if (currentGuess.length !== WORD_LENGTH) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      return
    }
    setGuesses((g) => [...g, currentGuess])
    setCurrentGuess('')
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter') handleEnter()
      else if (e.key === 'Backspace') handleBackspace()
      else if (HEBREW_KEYBOARD_ROWS.flat().includes(e.key)) handleLetter(e.key)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGuess, gameOver])

  function handleReset() {
    setTargetWord(pickRandomWord())
    setGuesses([])
    setCurrentGuess('')
  }

  let statusText = `נחשו מילה בת ${WORD_LENGTH} אותיות`
  if (isWinner) statusText = `🎉 ניצחתם ב-${guesses.length} ניחושים!`
  else if (isLoser) statusText = `😢 הפסדתם! המילה הייתה "${targetWord}"`

  return (
    <main className="page wordle-page">
      <div className="wordle-header">
        <h1>וורדל</h1>
        <p className="wordle-status">{statusText}</p>
      </div>

      <div className={`wordle-board ${shake ? 'shake' : ''}`}>
        <Confetti active={isWinner} />

        <div className="wordle-grid">
          {Array.from({ length: MAX_GUESSES }, (_, rowIndex) => {
            const submittedGuess = guesses[rowIndex]
            const isCurrentRow = rowIndex === guesses.length
            const rowLetters = submittedGuess
              ? submittedGuess.split('')
              : isCurrentRow
                ? currentGuess.split('').concat(Array(WORD_LENGTH - currentGuess.length).fill(''))
                : Array(WORD_LENGTH).fill('')
            const rowStatuses = submittedGuess ? evaluateGuess(submittedGuess, targetWord) : []

            return (
              <div className="wordle-row" key={rowIndex}>
                {rowLetters.map((letter, colIndex) => (
                  <span
                    key={colIndex}
                    className={`wordle-cell ${rowStatuses[colIndex] || ''} ${letter ? 'filled' : ''}`}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            )
          })}
        </div>

        <div className="wordle-keyboard">
          {HEBREW_KEYBOARD_ROWS.map((row, rowIndex) => (
            <div className="wordle-keyboard-row" key={rowIndex}>
              {row.map((letter) => (
                <button
                  key={letter}
                  className={`wordle-key ${keyboardStatuses[letter] || ''}`}
                  onClick={() => handleLetter(letter)}
                  disabled={gameOver}
                >
                  {letter}
                </button>
              ))}
            </div>
          ))}
          <div className="wordle-keyboard-row">
            <button className="wordle-key wide" onClick={handleBackspace} disabled={gameOver}>
              ⌫
            </button>
            <button className="wordle-key wide" onClick={handleEnter} disabled={gameOver}>
              אישור
            </button>
          </div>
        </div>
      </div>

      <div className="wordle-actions">
        <button className="wordle-reset" onClick={handleReset}>
          משחק חדש
        </button>
      </div>
    </main>
  )
}

export default Wordle
