import { useEffect, useRef, useState } from 'react'
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '~/lib/components/chat/chat-bubble'
import { ChatInput } from '~/lib/components/chat/chat-input'
import { ChatMessageList } from '~/lib/components/chat/chat-message-list'

export default function Chat() {
  const [userMessage, setUserMessage] = useState('')

  const messageListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = messageListRef.current
    if (div) {
      div.scrollTo(0, div.scrollHeight)
    }
  }, [userMessage])

  return (
    <div className="flex flex-col w-[70%] h-[600px] space-y-8">
      <ChatMessageList className="flex-1" ref={messageListRef}>
        <ChatBubble variant="sent">
          <ChatBubbleAvatar fallback="US" />
          <ChatBubbleMessage variant="sent">
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>

        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" />
          <ChatBubbleMessage variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>

        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" />
          <ChatBubbleMessage variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>

        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" />
          <ChatBubbleMessage variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>

        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" />
          <ChatBubbleMessage variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>

        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" />
          <ChatBubbleMessage isLoading />
        </ChatBubble>
      </ChatMessageList>
      <ChatInput
        className="max-h-[156px]"
        value={userMessage}
        onChange={e => setUserMessage(e.target.value)}
      >
      </ChatInput>
      {/* <Button type="submit" size="icon">
        <Send className="size-4" />
      </Button> */}
    </div>
  )
}
