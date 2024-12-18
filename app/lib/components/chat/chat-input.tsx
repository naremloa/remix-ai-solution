import React from 'react'
import { cn } from '~/shadcn/utils'
import { AutoResizeTextarea } from '../AutoResizeTextarea'

type ChatInputProps = {} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, ...props }, ref) => (
    <AutoResizeTextarea
      {...props}
      autoComplete="off"
      ref={ref}
      name="message"
      className={cn('', className)}
      // className={cn(
      //   'max-h-12 px-4 py-3 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center h-16 resize-none',
      //   className,
      // )}
    >
    </AutoResizeTextarea>
  ),
)
ChatInput.displayName = 'ChatInput'

export { ChatInput }
