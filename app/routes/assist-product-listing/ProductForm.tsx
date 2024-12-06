import type { TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useImperativeSubmit } from '~/lib/hooks/use-imperative-submit'
import { Button } from '~/shadcn/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/shadcn/components/ui/form'
import { Input } from '~/shadcn/components/ui/input'

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

export default function ProductForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: null,
    },
  })

  const onSubmit = useImperativeSubmit<TypeOf<typeof formSchema>>('POST', data => data)

  return (
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
  )
}
