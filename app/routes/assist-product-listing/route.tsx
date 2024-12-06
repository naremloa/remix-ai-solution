import type { ActionFunctionArgs } from '@remix-run/node'
import type { SubmitHandler } from 'react-hook-form'
import type { TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { json } from '@remix-run/node'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import { useImperativeSubmit } from '~/hook/use-imperative-submit'
import Article from '~/lib/components/Article'

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json()
  // console.log('message', data)
  // console.log('langchain', langchain)
  return json({ message: `Hello, ${data}` })
}

const categoryOptions: { value: string, label: string }[] = [
  { value: 'brand1', label: '品牌 1' },
  { value: 'brand2', label: '品牌 2' },
  { value: 'brand3', label: '品牌 3' },
  { value: 'brand4', label: '品牌 4' },
  { value: 'brand5', label: '品牌 5' },
]

const formSchema = z.object({
  title: z.string().min(1),
  category: z.string().nullish(),
})

export default function Index() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: null,
    },
  })

  const onSubmit: SubmitHandler<TypeOf<typeof formSchema>> = useImperativeSubmit<TypeOf<typeof formSchema>>(data => data)

  return (
    <Article title="Assist with product listing">
      <p>The goal of this solution is to assist users in product listing operations through AI-powered text generation and image analysis.</p>
      <Separator className="my-8"></Separator>
      <Card className="mt-4">
        <CardContent>
          <FormProvider {...form}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field: { value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" value={value ?? undefined} {...rest} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>
    </Article>
  )
}
