const SYMBOLS = ['🐶', '🐱', '🦁', '🐼', '🦊', '🐸', '🦄', '🐙']

export function createShuffledDeck() {
  const pairs = SYMBOLS.flatMap((symbol, pairIndex) => [
    { id: `${pairIndex}-a`, symbol, pairIndex },
    { id: `${pairIndex}-b`, symbol, pairIndex },
  ])

  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pairs[i], pairs[j]] = [pairs[j], pairs[i]]
  }

  return pairs
}
