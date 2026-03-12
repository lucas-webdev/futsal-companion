export interface Standing {
  team: string
  points: number
  wins: number
  draws: number
  losses: number
  gamesPlayed: number
  goalsFor: number
  goalsAgainst: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}