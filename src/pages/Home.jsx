import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <main className="page">
      <div className="home-hero">
        <h1>איזה משחק בא לך לשחק?</h1>
        <p>שני משחקים קלאסיים, בגרסה חדשה ומשודרגת</p>
      </div>

      <div className="game-grid">
        <Link to="/tic-tac-toe" className="game-card xo">
          <span className="icon">❌⭕</span>
          <h2>איקס עיגול</h2>
          <p>קלאסיקה משפחתית - שני שחקנים, לוח אחד, ניצחון אחד</p>
          <span className="play-badge">שחקו עכשיו</span>
        </Link>

        <Link to="/hangman" className="game-card hangman">
          <span className="icon">🕵️‍♀️🔤</span>
          <h2>איש תלוי</h2>
          <p>נחשו את המילה אות אחר אות לפני שנגמר לכם המזל</p>
          <span className="play-badge">שחקו עכשיו</span>
        </Link>
      </div>
    </main>
  )
}

export default Home
