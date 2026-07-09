import { Link } from 'react-router-dom'
import { GAMES } from '../data/games.js'
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
        {GAMES.map((game) => (
          <Link
            key={game.id}
            to={game.path}
            className="game-card"
            style={{ '--card-accent': game.color }}
          >
            <span className="icon">{game.icon}</span>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <span className="play-badge">שחקו עכשיו</span>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Home
