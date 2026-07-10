import { useState } from 'react'
import { pickRandomQuestions } from '../data/triviaQuestions.js'
import Confetti from '../components/Confetti.jsx'
import './Trivia.css'

const QUESTIONS_PER_ROUND = 10

function Trivia() {
  const [questions, setQuestions] = useState(() => pickRandomQuestions(QUESTIONS_PER_ROUND))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[currentIndex]
  const isAnswered = selectedIndex !== null
  const isLastQuestion = currentIndex === questions.length - 1
  const isGreatScore = finished && score >= Math.ceil(questions.length * 0.8)

  function handleAnswer(optionIndex) {
    if (isAnswered) return
    setSelectedIndex(optionIndex)
    if (optionIndex === currentQuestion.correctIndex) {
      setScore((s) => s + 1)
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      setFinished(true)
      return
    }
    setCurrentIndex((i) => i + 1)
    setSelectedIndex(null)
  }

  function handleRestart() {
    setQuestions(pickRandomQuestions(QUESTIONS_PER_ROUND))
    setCurrentIndex(0)
    setSelectedIndex(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <main className="page trivia-page">
      <div className="trivia-header">
        <h1>טריוויה</h1>
        {!finished && (
          <p className="trivia-progress">
            שאלה {currentIndex + 1} מתוך {questions.length} · ניקוד: {score}
          </p>
        )}
      </div>

      <div className="trivia-board">
        <Confetti active={isGreatScore} />

        {finished ? (
          <div className="trivia-result">
            <p className="trivia-result-score">
              {score} / {questions.length}
            </p>
            <p className="trivia-result-text">
              {isGreatScore ? '🎉 כל הכבוד, תוצאה מעולה!' : 'שיחקתם טוב, נסו שוב לשיפור!'}
            </p>
            <button className="trivia-restart" onClick={handleRestart}>
              משחק חדש
            </button>
          </div>
        ) : (
          <>
            <p className="trivia-question">{currentQuestion.question}</p>

            <div className="trivia-options">
              {currentQuestion.options.map((option, index) => {
                let className = 'trivia-option'
                if (isAnswered) {
                  if (index === currentQuestion.correctIndex) className += ' correct'
                  else if (index === selectedIndex) className += ' incorrect'
                }
                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            {isAnswered && (
              <button className="trivia-next" onClick={handleNext}>
                {isLastQuestion ? 'סיום' : 'שאלה הבאה'}
              </button>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default Trivia
