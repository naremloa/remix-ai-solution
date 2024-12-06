import Article from '~/lib/components/Article'
import { Card, CardContent } from '~/shadcn/components/ui/card'
import { Separator } from '~/shadcn/components/ui/separator'
import ProductForm from './ProductForm'

export default function Index() {
  return (
    <Article title="Assist with product listing">
      <p>The goal of this solution is to assist users in product listing operations through AI-powered text generation and image analysis.</p>
      <Separator className="my-8"></Separator>
      <Card className="mt-4">
        <CardContent>
          <ProductForm></ProductForm>
        </CardContent>
      </Card>
    </Article>
  )
}
