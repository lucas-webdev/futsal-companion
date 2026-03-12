import { useChat } from 'ai/react'

export function useChatAssistant(context: string) {
  return useChat({
    api: '/api/chat',
    body: { context },
  })
}