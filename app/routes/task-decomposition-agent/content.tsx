import { ofetch } from 'ofetch'
import { omit } from 'radash'
import { useState } from 'react'
import { decodeLangchainStream } from '~/lib/utils/stream'
import Chat from './chat'

export default function Content() {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<{ message: string, type: 'sent' | 'received', tmp?: boolean }[]>([])

  const onChat = async (message: string) => {
    setMessages(arr => [...arr, { message, type: 'sent' }])
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 4000))

    const response = await ofetch('/api/chat', {
      method: 'POST',
      body: { message },
      responseType: 'stream',
    })

    setLoading(false)
    await decodeLangchainStream({
      response,
      decoder: (value) => {
        if (messages.at(-1)?.tmp) {
          setMessages(arr => [
            ...arr.slice(0, -1),
            { message: `${arr.at(-1)?.message}${value}`, type: 'received', tmp: true },
          ])
        }
        else {
          setMessages(arr => [...arr, { message: value, type: 'received', tmp: true }])
        }
      },
    })

    setMessages(arr => arr.map(i => omit(i, ['tmp'])))
  }

  return (
    <div>
      <Chat
        messages={messages}
        loading={loading}
        onChat={onChat}
      >
      </Chat>
    </div>
  )
}
