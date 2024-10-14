import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import Article from '~/lib/components/Article'

export default function Index() {
  return (
    <Article title="Collaborate on article writing">
      <p>The goal of this solution is to generate initial content through an initial prompt, and then continuously make adjustments to the initial content based on new prompts.</p>
      <ul>
        <p>STEP:</p>
        <li>1. Initialize a description through a prompt.</li>
        <li>2. Propose a new prompt to modify the description.</li>
        <li>3. Analyze whether the prompt should be applied to the entire description or just specific paragraphs or sentences.</li>
        <li>4. Generate a new description and repeat step 2 and 3 until satisfied.</li>
      </ul>
      <Separator className="my-8"></Separator>
      <Card className="">
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
