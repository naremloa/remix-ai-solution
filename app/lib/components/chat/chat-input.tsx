import type { TextareaHTMLAttributes } from 'react'
import type { Promisable } from 'type-fest'
import { ArrowUp } from 'lucide-react'
import { throttle } from 'radash'
import React, { useState } from 'react'
import { Button } from '~/lib/components/Button'
import { cn } from '~/shadcn/utils'
import { AutoResizeTextarea } from '../AutoResizeTextarea'

type ChatInputProps = {
  chat: () => Promisable<void>
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, chat, ...props }, ref) => {
    const [loading, setLoading] = useState(false)

    const handleChat = throttle({ interval: 800 }, async () => {
      if (loading)
        return
      setLoading(true)
      await chat()
      setLoading(false)
    })

    return (
      <div className="flex flex-col border rounded-lg pb-[8px] px-[8px]">
        <AutoResizeTextarea
          {...props}
          autoComplete="off"
          ref={ref}
          name="message"
          className={cn('focus-visible:ring-0 border-0', className)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              await handleChat()
            }
          }}
        >
        </AutoResizeTextarea>
        <div className="flex justify-end">
          <Button size="icon" className="rounded-full" loading={loading} onClick={handleChat}>
            <ArrowUp strokeWidth={3}></ArrowUp>
          </Button>
        </div>
      </div>
    )
  },
)
ChatInput.displayName = 'ChatInput'

export { ChatInput }
