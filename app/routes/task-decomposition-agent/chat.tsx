import type { Promisable } from 'type-fest'
import { useRef, useState } from 'react'
import { useDebounce } from 'react-use/esm'
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '~/lib/components/chat/chat-bubble'
import { ChatInput } from '~/lib/components/chat/chat-input'
import { ChatMessageList } from '~/lib/components/chat/chat-message-list'

export default function Chat({ messages, loading, onChat }: {
  onChat: (message: string) => Promisable<void>
  messages?: { type: 'sent' | 'received', message: string }[]
  loading?: boolean
}) {
  const [userMessage, setUserMessage] = useState('我有一個樂高想要上架進行販售，但後台的商品上架太複雜了，我不太知道該如何進行下一步，請提供給我協助。')

  const messageListRef = useRef<HTMLDivElement>(null)

  useDebounce(() => {
    const div = messageListRef.current
    if (div) {
      div.scrollTo(0, div.scrollHeight)
    }
  }, 300, [userMessage, messages])

  return (
    <div className="flex flex-col w-[70%] h-[600px] space-y-8">
      <ChatMessageList className="flex-1" ref={messageListRef}>
        {(messages ?? []).map((message, idx) => (
          <ChatBubble variant={message.type} key={`chat-${idx}`}>
            <ChatBubbleAvatar fallback={message.type === 'sent' ? 'U' : 'AI'} />
            <ChatBubbleMessage variant={message.type}>
              {message.message}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}
        {loading
          ? (
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )
          : null}
      </ChatMessageList>
      <ChatInput
        className="max-h-[156px]"
        value={userMessage}
        onChange={e => setUserMessage(e.target.value)}
        chat={async () => {
          setUserMessage('')
          await onChat(userMessage)
        }}
      >
      </ChatInput>
    </div>
  )
}
