import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import Article from '~/lib/components/Article'

export default function Index() {
  return (
    <Article title="Automatically Generate Product Description">
      <p>The goal of this solution is to extract and integrate images uploaded by users along with other information provided, automatically generating product descriptions, including specifications and enhanced introduction text.</p>
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </Article>
  )
}
