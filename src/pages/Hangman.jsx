import { useCallback, useState } from 'react'
import { pickRandomWord } from '../data/hangmanWords.js'
import { toBaseLetter } from '../utils/hebrewLetters.js'
import HangmanFigure from '../components/HangmanFigure.jsx'
import HebrewKeyboard from '../components/HebrewKeyboard.jsx'
import './Hangman.css'

const MAX_WRONG_GUESSES = 6

function Hangman() {
  const [{ word, category }, setRound] = useState(pickRandomWord)
  const [guessedLetters, setGuessedLetters] = useState([])

  const wordLetters = word.split('')
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordLetters.some((wordLetter) => toBaseLetter(wordLetter) === letter),
  )
  const isWinner = wordLetters.every((letter) => guessedLetters.includes(toBaseLetter(letter)))
  const isLoser = incorrectLetters.length >= MAX_WRONG_GUESSES
  const gameOver = isWinner || isLoser

  const handleGuess = useCallback(
    (letter) => {
      if (gameOver || guessedLetters.includes(letter)) return
      setGuessedLetters((current) => [...current, letter])
    },
    [gameOver, guessedLetters],
  )

  function handleReset() {
    setRound(pickRandomWord())
    setGuessedLetters([])
  }

  let statusText = `נותרו ${MAX_WRONG_GUESSES - incorrectLetters.length} ניחושים`
  let statusClass = ''
  if (isWinner) {
    statusText = '🎉 ניצחת!'
    statusClass = 'win'
  } else if (isLoser) {
    statusText = `😢 הפסדת! המילה הייתה "${word}"`
    statusClass = 'lose'
  }

  return (
    <main className="page hangman-page">
      <div className="hangman-header">
        <h1>איש תלוי</h1>
        <p className="hangman-category">קטגוריה: {category}</p>
      </div>

      <div className="hangman-board">
        <HangmanFigure wrongGuesses={incorrectLetters.length} />

        <div className="hangman-word">
          {wordLetters.map((letter, index) => {
            const revealed = guessedLetters.includes(toBaseLetter(letter)) || isLoser
            const wasWrong = isLoser && !guessedLetters.includes(toBaseLetter(letter))
            return (
              <span
                key={index}
                className={`hangman-letter-slot ${wasWrong ? 'revealed-wrong' : ''}`}
              >
                {revealed ? letter : ''}
              </span>
            )
          })}
        </div>

        <p className={`hangman-status ${statusClass}`}>{statusText}</p>

        <HebrewKeyboard
          correctLetters={guessedLetters.filter(
            (letter) => !incorrectLetters.includes(letter),
          )}
          incorrectLetters={incorrectLetters}
          onGuess={handleGuess}
          disabled={gameOver}
        />
      </div>

      <div className="hangman-actions">
        <button className="hangman-reset" onClick={handleReset}>
          משחק חדש
        </button>
      </div>
    </main>
  )
}

export default Hangman
