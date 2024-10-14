import type { FC, PropsWithChildren } from 'react'

export default (function Article({ title, children }) {
  return (
    <article className="text-lg flex flex-col gap-2 py-5 px-10">
      <h1 className="text-2xl mb-4">{title}</h1>
      {children}
    </article>
  )
}) satisfies FC<PropsWithChildren<{ title: string }>>
