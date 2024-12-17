import type { ChangeEvent, ComponentProps, PropsWithChildren } from 'react'
import { useRef } from 'react' // 引入 shadcn 的 Textarea 组件
import { Textarea } from '~/shadcn/components/ui/textarea'

export function AutoResizeTextarea({
  onInput,
  ...props
}: Omit<PropsWithChildren<ComponentProps<'textarea'>>, 'onInput'>
  & {
    onInput?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
    onInput?.(e)
  }

  return (
    <Textarea
      {...props}
      ref={textareaRef}
      onInput={handleInput}
      className="resize-none" // 禁止用户手动拖动
      placeholder="输入内容..."
    />
  )
}
