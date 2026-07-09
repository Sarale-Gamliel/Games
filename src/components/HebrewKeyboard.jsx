import { useState } from 'react'
import { ALPHABET } from '../utils/hebrewLetters.js'
import './HebrewKeyboard.css'

const PRESS_ANIMATION_MS = 280

function HebrewKeyboard({ correctLetters, incorrectLetters, onGuess, disabled }) {
  const [pressedLetter, setPressedLetter] = useState(null)

  function handleClick(letter) {
    onGuess(letter)
    setPressedLetter(letter)
    setTimeout(() => setPressedLetter((current) => (current === letter ? null : current)), PRESS_ANIMATION_MS)
  }

  return (
    <div className="keyboard">
      {ALPHABET.map((letter) => {
        const isCorrect = correctLetters.includes(letter)
        const isIncorrect = incorrectLetters.includes(letter)
        return (
          <button
            key={letter}
            className={`key ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''} ${
              pressedLetter === letter ? 'pressed' : ''
            }`}
            onClick={() => handleClick(letter)}
            disabled={disabled || isCorrect || isIncorrect}
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}

export default HebrewKeyboard
