const SIZE = 4

export function createEmptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
}

export function addRandomTile(grid) {
  const empty = []
  grid.forEach((row, r) => row.forEach((cell, c) => cell === 0 && empty.push([r, c])))
  if (empty.length === 0) return grid

  const [r, c] = empty[Math.floor(Math.random() * empty.length)]
  const next = grid.map((row) => [...row])
  next[r][c] = Math.random() < 0.9 ? 2 : 4
  return next
}

export function createInitialGrid() {
  return addRandomTile(addRandomTile(createEmptyGrid()))
}

function slideRowLeft(row) {
  const nonZero = row.filter((v) => v !== 0)
  const merged = []
  let scoreGained = 0
  let i = 0

  while (i < nonZero.length) {
    if (nonZero[i] === nonZero[i + 1]) {
      const value = nonZero[i] * 2
      merged.push(value)
      scoreGained += value
      i += 2
    } else {
      merged.push(nonZero[i])
      i += 1
    }
  }

  while (merged.length < row.length) merged.push(0)
  return { row: merged, scoreGained }
}

function transpose(grid) {
  return grid[0].map((_, c) => grid.map((row) => row[c]))
}

function reverseRows(grid) {
  return grid.map((row) => [...row].reverse())
}

export function move(grid, direction) {
  let working = grid
  const transposed = direction === 'up' || direction === 'down'
  const reversed = direction === 'right' || direction === 'down'

  if (transposed) working = transpose(working)
  if (reversed) working = reverseRows(working)

  let scoreGained = 0
  let result = working.map((row) => {
    const slid = slideRowLeft(row)
    scoreGained += slid.scoreGained
    return slid.row
  })

  if (reversed) result = reverseRows(result)
  if (transposed) result = transpose(result)

  const moved = JSON.stringify(result) !== JSON.stringify(grid)
  return { grid: result, scoreGained, moved }
}

export function hasAvailableMoves(grid) {
  const size = grid.length
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) return true
      if (c < size - 1 && grid[r][c] === grid[r][c + 1]) return true
      if (r < size - 1 && grid[r][c] === grid[r + 1][c]) return true
    }
  }
  return false
}

export function hasReached2048(grid) {
  return grid.some((row) => row.some((cell) => cell >= 2048))
}
