import { Standing } from '@/types'

export function buildStandingsContext(standings: Standing[]): string {
  const table = standings
    .map(
      (s, i) =>
        `${i + 1}. ${s.team} — ${s.points}pts | ${s.wins}V ${s.draws}E ${s.losses}D | GP:${s.goalsFor} GC:${s.goalsAgainst}`
    )
    .join('\n')

  return `
You are a Brazilian Futsal League assistant. Answer questions in the same language the user writes.
Always base your answers on the standings data below. Do not invent results or projections.

Current standings:
${table}

Tournament rules summary:
- Top 8 teams advance to the knockout phase
- Tiebreaker criteria: points → wins → goal difference → goals scored
  `.trim()
}