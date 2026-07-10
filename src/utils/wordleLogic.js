export const WORD_LENGTH = 5
export const MAX_GUESSES = 6

export const WORD_LIST = [
  'שולחן',
  'כרטיס',
  'מטריה',
  'מנורה',
  'שמיכה',
  'גלידה',
  'ארנבת',
  'דבורה',
  'ציפור',
  'אבטיח',
  'תמונה',
  'משקפת',
  'תרמיל',
  'מקלחת',
  'ספריה',
  'תלמיד',
  'מברשת',
  'מחברת',
  'משאית',
  'מדינה',
  'משפחה',
  'חופשה',
  'מסעדה',
  'תמנון',
  'חידון',
  'מצלמה',
  'תרופה',
]

// Mirrors a physical Hebrew keyboard layout (including the sofit keys),
// so players type words the same way they would on a real keyboard.
export const HEBREW_KEYBOARD_ROWS = [
  ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
  ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
  ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'],
]

export function pickRandomWord() {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
}

export function evaluateGuess(guess, target) {
  const guessLetters = guess.split('')
  const targetLetters = target.split('')
  const statuses = Array(WORD_LENGTH).fill('absent')
  const remaining = {}

  guessLetters.forEach((letter, i) => {
    if (letter === targetLetters[i]) {
      statuses[i] = 'correct'
    } else {
      remaining[targetLetters[i]] = (remaining[targetLetters[i]] || 0) + 1
    }
  })

  guessLetters.forEach((letter, i) => {
    if (statuses[i] === 'correct') return
    if (remaining[letter] > 0) {
      statuses[i] = 'present'
      remaining[letter] -= 1
    }
  })

  return statuses
}

const STATUS_PRIORITY = { correct: 3, present: 2, absent: 1 }

export function getKeyboardStatuses(guesses, target) {
  const statuses = {}
  guesses.forEach((guess) => {
    const result = evaluateGuess(guess, target)
    guess.split('').forEach((letter, i) => {
      const current = statuses[letter]
      if (!current || STATUS_PRIORITY[result[i]] > STATUS_PRIORITY[current]) {
        statuses[letter] = result[i]
      }
    })
  })
  return statuses
}
