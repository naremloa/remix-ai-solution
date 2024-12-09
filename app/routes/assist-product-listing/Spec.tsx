import type { PropsWithChildren } from 'react'

export function SpecBox({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-between space-y-2">
      {children}
    </div>
  )
}

export function SpecItem({ value, label }: { value?: string | null, label: string }) {
  return (
    <div className="flex justify-between space-x-4">
      <div className="flex-shrink-0">{label}</div>
      <div>{value ?? ''}</div>
    </div>
  )
}
