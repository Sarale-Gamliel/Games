export const CHOICES = [
  { id: 'rock', label: 'אבן', icon: '✊' },
  { id: 'paper', label: 'נייר', icon: '✋' },
  { id: 'scissors', label: 'מספריים', icon: '✌️' },
]

const BEATS = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
}

export function getRandomChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)].id
}

export function getRoundResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'draw'
  return BEATS[playerChoice] === computerChoice ? 'player' : 'computer'
}
