import type { ComponentProps } from 'react'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Textarea } from '~/shadcn/components/ui/textarea'
import { cn } from '~/shadcn/utils'

const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement | undefined,
  ComponentProps<'textarea'>
>(({ value, className, ...props }, ref) => {
  const internalRef = useRef<HTMLTextAreaElement | null>(null)
  useImperativeHandle(ref, () => internalRef.current ?? undefined)

  useEffect(() => {
    const textarea = internalRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  return (
    <Textarea
      {...props}
      className={cn('resize-none', className)}
      ref={internalRef}
      value={value}
    >
    </Textarea>
  )
})

AutoResizeTextarea.displayName = 'AutoResizeTextarea'

export { AutoResizeTextarea }
