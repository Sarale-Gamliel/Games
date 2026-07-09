export const SIMON_COLORS = [
  { id: 0, name: 'green', hex: '#22c55e', litHex: '#4ade80' },
  { id: 1, name: 'red', hex: '#ef4444', litHex: '#f87171' },
  { id: 2, name: 'yellow', hex: '#eab308', litHex: '#facc15' },
  { id: 3, name: 'blue', hex: '#3b82f6', litHex: '#60a5fa' },
]

export function randomColorId() {
  return Math.floor(Math.random() * SIMON_COLORS.length)
}
