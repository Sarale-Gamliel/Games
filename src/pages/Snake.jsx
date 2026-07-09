import { useEffect, useRef, useState } from 'react'
import './Snake.css'

const GRID_SIZE = 16
const CELL_PX = 20
const CANVAS_PX = GRID_SIZE * CELL_PX
const TICK_MS = 130
const DRAG_THRESHOLD_PX = 20

const OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' }
const DELTAS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}
const KEY_TO_DIRECTION = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

function createInitialSnake() {
  return [
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ]
}

function randomEmptyCell(snake) {
  let cell
  do {
    cell = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  } while (snake.some((seg) => seg.x === cell.x && seg.y === cell.y))
  return cell
}

function Snake() {
  const canvasRef = useRef(null)
  const snakeRef = useRef(createInitialSnake())
  const directionRef = useRef('right')
  const pendingDirectionRef = useRef('right')
  const foodRef = useRef({ x: 12, y: 8 })
  const intervalRef = useRef(null)
  const dragStartRef = useRef(null)

  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [started, setStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  function draw() {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#eff9de'
    ctx.fillRect(0, 0, CANVAS_PX, CANVAS_PX)

    const food = foodRef.current
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(
      food.x * CELL_PX + CELL_PX / 2,
      food.y * CELL_PX + CELL_PX / 2,
      CELL_PX / 2.6,
      0,
      Math.PI * 2,
    )
    ctx.fill()

    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#3f6212' : '#65a30d'
      ctx.beginPath()
      ctx.roundRect(
        segment.x * CELL_PX + 1,
        segment.y * CELL_PX + 1,
        CELL_PX - 2,
        CELL_PX - 2,
        4,
      )
      ctx.fill()
    })
  }

  function endGame() {
    clearInterval(intervalRef.current)
    setGameOver(true)
    setBest((b) => Math.max(b, snakeRef.current.length - 3))
  }

  function tick() {
    directionRef.current = pendingDirectionRef.current
    const delta = DELTAS[directionRef.current]
    const head = snakeRef.current[0]
    const newHead = { x: head.x + delta.x, y: head.y + delta.y }

    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE ||
      snakeRef.current.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
    ) {
      endGame()
      return
    }

    const ateFood = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y
    const nextSnake = [newHead, ...snakeRef.current]
    if (ateFood) {
      setScore((s) => s + 1)
      foodRef.current = randomEmptyCell(nextSnake)
    } else {
      nextSnake.pop()
    }
    snakeRef.current = nextSnake
    draw()
  }

  function startGame() {
    snakeRef.current = createInitialSnake()
    directionRef.current = 'right'
    pendingDirectionRef.current = 'right'
    foodRef.current = randomEmptyCell(snakeRef.current)
    setScore(0)
    setGameOver(false)
    setStarted(true)
  }

  useEffect(() => {
    draw()
    if (!started || gameOver) return
    intervalRef.current = setInterval(tick, TICK_MS)
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, gameOver])

  function changeDirection(newDirection) {
    if (OPPOSITE[newDirection] === directionRef.current) return
    pendingDirectionRef.current = newDirection
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const direction = KEY_TO_DIRECTION[e.key]
      if (!direction) return
      e.preventDefault()
      changeDirection(direction)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handlePointerDown(e) {
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }

  function handlePointerUp(e) {
    const start = dragStartRef.current
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    if (Math.max(absDx, absDy) >= DRAG_THRESHOLD_PX) {
      if (absDx > absDy) changeDirection(dx > 0 ? 'right' : 'left')
      else changeDirection(dy > 0 ? 'down' : 'up')
    }
    dragStartRef.current = null
  }

  let statusText = 'לחצו "התחלה" כדי לשחק'
  if (gameOver) statusText = `😢 הפסדתם! ניקוד: ${score}`
  else if (started) statusText = 'גררו או השתמשו בחצים כדי לנווט'

  return (
    <main className="page snake-page">
      <div className="snake-header">
        <h1>נחש</h1>
        <p className="snake-status">{statusText}</p>
      </div>

      <div className="snake-scoreboard">
        <div className="snake-score">ניקוד: {score}</div>
        <div className="snake-score">שיא הסשן: {best}</div>
      </div>

      <div
        className="snake-board"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_PX}
          height={CANVAS_PX}
          className="snake-canvas"
        />

        {(!started || gameOver) && (
          <div className="snake-overlay">
            {gameOver && <p>ניקוד סופי: {score}</p>}
            <button onClick={startGame}>{gameOver ? 'שחקו שוב' : 'התחלה'}</button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Snake
