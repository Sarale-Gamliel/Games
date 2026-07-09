import { Link } from 'react-router-dom'
import './Home.css'

const FEATURES = [
  { icon: '🎯', label: 'אתגרו את עצמכם' },
  { icon: '🤝', label: 'שחקו עם חברים' },
  { icon: '🏆', label: 'שברו שיאים' },
]

function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-icon">🎮</div>
        <h1>משחקים שיגרמו לכם להתמכר</h1>

        <ul className="hero-features">
          {FEATURES.map((feature) => (
            <li key={feature.label}>
              <span className="hero-feature-icon">{feature.icon}</span>
              {feature.label}
            </li>
          ))}
        </ul>

        <a href="#games" className="hero-cta">
          התחל לשחק
        </a>
      </section>

      <div className="game-grid" id="games">
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
