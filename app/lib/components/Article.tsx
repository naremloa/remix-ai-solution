import type { PropsWithChildren, ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/shadcn/components/ui/accordion'

export function Article({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <article className="text-lg flex flex-col gap-2 py-5 px-10">
      <h1 className="text-2xl mb-4">{title}</h1>
      {children}
    </article>
  )
}

export function ArticleHeader({ items }: PropsWithChildren<{
  items: { title: string, content: ReactNode }[]
}>) {
  return (
    <Accordion type="multiple" className="mb-8">
      {items.map(item => (
        <AccordionItem key={item.title} value={item.title}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
