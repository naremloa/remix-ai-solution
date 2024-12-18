import type { IterableElement } from 'type-fest'
import { useState } from 'react'
import { Article, ArticleHeader } from '~/lib/components/Article'
import { Button } from '~/lib/components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '~/shadcn/components/ui/card'
import { demo } from './demo'
import ProductForm from './ProductForm'

export default function Index() {
  const [demoValue, setDemo] = useState<IterableElement<typeof demo> | null>(null)

  return (
    <Article title="Assist with product listing">
      <ArticleHeader items={[{ title: 'Goal', content: 'The goal of this solution is to assist users in product listing operations through AI-powered text generation and image analysis.' }]}></ArticleHeader>
      <p className="flex gap-4 items-center my-4">
        範例：
        {demo.map(i => (
          <Button
            key={i.title}
            variant="outline"
            onClick={() => setDemo(i)}
          >
            {i.title}
          </Button>
        ))}
      </p>

      <Card>
        <CardHeader>
          <CardTitle>商品上架</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm demo={demoValue}></ProductForm>
        </CardContent>
      </Card>
    </Article>
  )
}
