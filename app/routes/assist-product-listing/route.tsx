import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Card, CardContent } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import Article from '~/lib/components/Article'
import ProductForm from './ProductForm'

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json()
  console.log('method', request.method)
  // console.log('message', data)
  // console.log('langchain', langchain)
  return json({ message: `Hello, ${data}` })
}

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
