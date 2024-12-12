import { Article, ArticleHeader } from '~/lib/components/Article'
import { Card, CardContent, CardHeader, CardTitle } from '~/shadcn/components/ui/card'
import ProductForm from './ProductForm'

export default function Index() {
  return (
    <Article title="Assist with product listing">
      <ArticleHeader items={[{ title: 'Goal', content: 'The goal of this solution is to assist users in product listing operations through AI-powered text generation and image analysis.' }]}></ArticleHeader>
      <Card>
        <CardHeader>
          <CardTitle>商品上架</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm></ProductForm>
        </CardContent>
      </Card>
    </Article>
  )
}
