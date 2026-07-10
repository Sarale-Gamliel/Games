import { useEffect, useRef, useState } from 'react'
import './FlappyBird.css'

const CANVAS_W = 320
const CANVAS_H = 480
const BIRD_X = 60
const BIRD_SIZE = 24
const GRAVITY = 0.35
const JUMP_VELOCITY = -4.2
const PIPE_WIDTH = 52
const PIPE_GAP = 160
const PIPE_SPEED = 2.1
const PIPE_SPACING = 210
const GROUND_HEIGHT = 20

function FlappyBird() {
  const canvasRef = useRef(null)
  const birdYRef = useRef(CANVAS_H / 2)
  const birdVelocityRef = useRef(0)
  const pipesRef = useRef([])
  const scoreRef = useRef(0)
  const gameStateRef = useRef('idle') // 'idle' | 'playing' | 'over'
  const rafRef = useRef(null)

  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [started, setStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  function draw() {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#bde5f7'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    ctx.fillStyle = '#22c55e'
    pipesRef.current.forEach((pipe) => {
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY)
      ctx.fillRect(
        pipe.x,
        pipe.gapY + PIPE_GAP,
        PIPE_WIDTH,
        CANVAS_H - GROUND_HEIGHT - (pipe.gapY + PIPE_GAP),
      )
    })

    ctx.fillStyle = '#a16207'
    ctx.fillRect(0, CANVAS_H - GROUND_HEIGHT, CANVAS_W, GROUND_HEIGHT)

    ctx.fillStyle = '#facc15'
    ctx.beginPath()
    ctx.arc(BIRD_X + BIRD_SIZE / 2, birdYRef.current + BIRD_SIZE / 2, BIRD_SIZE / 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#1c1917'
    ctx.beginPath()
    ctx.arc(BIRD_X + BIRD_SIZE * 0.65, birdYRef.current + BIRD_SIZE * 0.35, 2.5, 0, Math.PI * 2)
    ctx.fill()
  }

  function endGame() {
    cancelAnimationFrame(rafRef.current)
    gameStateRef.current = 'over'
    setGameOver(true)
    setBest((b) => Math.max(b, scoreRef.current))
  }

  function loop() {
    if (gameStateRef.current !== 'playing') return

    birdVelocityRef.current += GRAVITY
    birdYRef.current += birdVelocityRef.current

    pipesRef.current.forEach((p) => {
      p.x -= PIPE_SPEED
    })
    pipesRef.current = pipesRef.current.filter((p) => p.x + PIPE_WIDTH > 0)

    const lastPipe = pipesRef.current[pipesRef.current.length - 1]
    if (!lastPipe || lastPipe.x < CANVAS_W - PIPE_SPACING) {
      const margin = 50
      const gapY = margin + Math.random() * (CANVAS_H - GROUND_HEIGHT - PIPE_GAP - margin * 2)
      pipesRef.current.push({ x: CANVAS_W, gapY, passed: false })
    }

    pipesRef.current.forEach((p) => {
      if (!p.passed && p.x + PIPE_WIDTH < BIRD_X) {
        p.passed = true
        scoreRef.current += 1
        setScore(scoreRef.current)
      }
    })

    if (birdYRef.current < 0 || birdYRef.current + BIRD_SIZE > CANVAS_H - GROUND_HEIGHT) {
      endGame()
      return
    }

    const birdRight = BIRD_X + BIRD_SIZE
    const birdBottom = birdYRef.current + BIRD_SIZE
    for (const p of pipesRef.current) {
      const withinPipeX = birdRight > p.x && BIRD_X < p.x + PIPE_WIDTH
      if (withinPipeX) {
        const hitsTop = birdYRef.current < p.gapY
        const hitsBottom = birdBottom > p.gapY + PIPE_GAP
        if (hitsTop || hitsBottom) {
          endGame()
          return
        }
      }
    }

    draw()
    rafRef.current = requestAnimationFrame(loop)
  }

  function startGame() {
    birdYRef.current = CANVAS_H / 2
    birdVelocityRef.current = 0
    pipesRef.current = []
    scoreRef.current = 0
    setScore(0)
    setGameOver(false)
    setStarted(true)
    gameStateRef.current = 'playing'
    rafRef.current = requestAnimationFrame(loop)
  }

  function flap() {
    if (gameStateRef.current !== 'playing') return
    birdVelocityRef.current = JUMP_VELOCITY
  }

  useEffect(() => {
    draw()
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault()
        flap()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  let statusText = 'לחצו "התחלה" ואז הקישו כדי לעוף'
  if (gameOver) statusText = `😢 התרסקתם! ניקוד: ${score}`
  else if (started) statusText = 'הקישו / רווח כדי לעוף'

  return (
    <main className="page flappy-page">
      <div className="flappy-header">
        <h1>Flappy Bird</h1>
        <p className="flappy-status">{statusText}</p>
      </div>

      <div className="flappy-scoreboard">
        <div className="flappy-score">ניקוד: {score}</div>
        <div className="flappy-score">שיא הסשן: {best}</div>
      </div>

      <div className="flappy-board" onPointerDown={flap}>
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="flappy-canvas" />

        {(!started || gameOver) && (
          <div className="flappy-overlay">
            {gameOver && <p>ניקוד סופי: {score}</p>}
            <button
              onClick={(e) => {
                e.stopPropagation()
                startGame()
              }}
            >
              {gameOver ? 'שחקו שוב' : 'התחלה'}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default FlappyBird
