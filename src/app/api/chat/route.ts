import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, context } = await req.json()

  const result = await streamText({
    model: anthropic('claude-haiku-4-5'),
    system: context,
    messages,
  })

  return result.toDataStreamResponse()
}