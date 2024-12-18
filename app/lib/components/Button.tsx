import type { PropsWithChildren } from 'react'
import type { ButtonProps } from '~/shadcn/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button as Btn } from '~/shadcn/components/ui/button'

export function Button({ onClick, children, disabled, loading, ...rest }: PropsWithChildren<ButtonProps & { loading?: boolean }>) {
  const [internalLoading, setInternalLoading] = useState(false)
  const isControlled = loading !== undefined
  const handleClick = async (...params: Parameters<NonNullable<ButtonProps['onClick']>>) => {
    try {
      !isControlled && setInternalLoading(true)
      await onClick?.(...params)
    }
    finally {
      !isControlled && setInternalLoading(false)
    }
  }
  return (
    <Btn {...rest} onClick={handleClick} disabled={loading || disabled}>
      {(loading ?? internalLoading) ? <Loader2 className="animate-spin" /> : children}
    </Btn>
  )
}
