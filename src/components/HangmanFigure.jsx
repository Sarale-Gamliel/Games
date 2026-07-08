import './HangmanFigure.css'

function HangmanFigure({ wrongGuesses }) {
  return (
    <svg viewBox="0 0 200 220" className="hangman-figure" aria-hidden="true">
      <line x1="10" y1="210" x2="120" y2="210" className="gallows" />
      <line x1="40" y1="210" x2="40" y2="10" className="gallows" />
      <line x1="40" y1="10" x2="130" y2="10" className="gallows" />
      <line x1="130" y1="10" x2="130" y2="40" className="gallows" />

      <circle
        cx="130"
        cy="60"
        r="20"
        className={`part ${wrongGuesses >= 1 ? 'visible' : ''}`}
      />
      <line
        x1="130"
        y1="80"
        x2="130"
        y2="140"
        className={`part ${wrongGuesses >= 2 ? 'visible' : ''}`}
      />
      <line
        x1="130"
        y1="95"
        x2="105"
        y2="120"
        className={`part ${wrongGuesses >= 3 ? 'visible' : ''}`}
      />
      <line
        x1="130"
        y1="95"
        x2="155"
        y2="120"
        className={`part ${wrongGuesses >= 4 ? 'visible' : ''}`}
      />
      <line
        x1="130"
        y1="140"
        x2="108"
        y2="185"
        className={`part ${wrongGuesses >= 5 ? 'visible' : ''}`}
      />
      <line
        x1="130"
        y1="140"
        x2="152"
        y2="185"
        className={`part ${wrongGuesses >= 6 ? 'visible' : ''}`}
      />
    </svg>
  )
}

export default HangmanFigure
