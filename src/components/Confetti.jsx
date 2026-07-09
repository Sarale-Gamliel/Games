import './Confetti.css'

const COLORS = ['#f97316', '#ec4899', '#7c3aed', '#10b981', '#0284c7', '#f59e0b']
const PIECE_COUNT = 26

const PIECES = Array.from({ length: PIECE_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 0.4,
  duration: 1.6 + Math.random() * 1,
  color: COLORS[i % COLORS.length],
  rotation: Math.random() * 360,
}))

function Confetti({ active }) {
  if (!active) return null

  return (
    <div className="confetti" aria-hidden="true">
      {PIECES.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            background: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
