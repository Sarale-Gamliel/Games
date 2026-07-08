import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TicTacToe from './pages/TicTacToe.jsx'
import Hangman from './pages/Hangman.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="top-nav">
          <Link to="/" className="brand">
            🎮 משחקים
          </Link>
          <nav style={{ display: 'flex', gap: 16 }}>
            <NavLink to="/tic-tac-toe">איקס עיגול</NavLink>
            <NavLink to="/hangman">איש תלוי</NavLink>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/hangman" element={<Hangman />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
