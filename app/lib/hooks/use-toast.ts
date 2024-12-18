/**
 * some solutions
 * [Add position prop to toaster #128](https://github.com/shadcn-ui/ui/issues/128)
 */
import type { ArrayTail } from 'type-fest'
import { toast as toastDefault, useToast as useToastDefault } from '~/shadcn/hooks/use-toast'
import { cn } from '~/shadcn/utils'

export function toast(props: Parameters<typeof toastDefault>[0], ...restParams: ArrayTail<Parameters<typeof toastDefault>>) {
  const { className, ...restProps } = props
  return toastDefault(
    {
      ...restProps,
      className: cn(
        'fixed top-0 right-0',
        'flex',
        'md:max-w-[420px] md:top-4 md:right-6',
        className,
      ),
    },
    ...restParams,
  )
}

export function useToast() {
  return { ...useToastDefault(), toast }
}
