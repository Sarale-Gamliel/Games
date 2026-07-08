import { ALPHABET } from '../utils/hebrewLetters.js'
import './HebrewKeyboard.css'

function HebrewKeyboard({ correctLetters, incorrectLetters, onGuess, disabled }) {
  return (
    <div className="keyboard">
      {ALPHABET.map((letter) => {
        const isCorrect = correctLetters.includes(letter)
        const isIncorrect = incorrectLetters.includes(letter)
        return (
          <button
            key={letter}
            className={`key ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`}
            onClick={() => onGuess(letter)}
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
