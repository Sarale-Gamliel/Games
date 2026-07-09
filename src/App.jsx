import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import { GAMES } from './data/games.js'
import Home from './pages/Home.jsx'
import TicTacToe from './pages/TicTacToe.jsx'
import Hangman from './pages/Hangman.jsx'
import Memory from './pages/Memory.jsx'
import ConnectFour from './pages/ConnectFour.jsx'
import Game2048 from './pages/Game2048.jsx'
import RockPaperScissors from './pages/RockPaperScissors.jsx'
import Simon from './pages/Simon.jsx'
import Snake from './pages/Snake.jsx'
import BackgroundBlobs from './components/BackgroundBlobs.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <BrowserRouter>
      <BackgroundBlobs />
      <div className="app-shell">
        <header className="top-nav">
          <Link to="/" className="brand">
            🎮 משחקים
          </Link>
          <nav className="top-nav-links">
            {GAMES.map((game) => (
              <NavLink key={game.id} to={game.path}>
                {game.title}
              </NavLink>
            ))}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/hangman" element={<Hangman />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/connect-four" element={<ConnectFour />} />
          <Route path="/2048" element={<Game2048 />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
          <Route path="/simon" element={<Simon />} />
          <Route path="/snake" element={<Snake />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
