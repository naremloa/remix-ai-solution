/**
 * some solutions
 * [Add position prop to toaster #128](https://github.com/shadcn-ui/ui/issues/128)
 */
import type { SubmitHandler } from 'react-hook-form'
import type { TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { ofetch } from 'ofetch'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { decodeLangchainStream } from '~/lib/utils/stream'
import { Button } from '~/shadcn/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/shadcn/components/ui/form'
import { Input } from '~/shadcn/components/ui/input'
import { useToast } from '~/shadcn/hooks/use-toast'
import { cn } from '~/shadcn/utils'

const categoryOptions: { value: string, label: string }[] = [
  { value: 'brand1', label: '品牌 1' },
  { value: 'brand2', label: '品牌 2' },
  { value: 'brand3', label: '品牌 3' },
  { value: 'brand4', label: '品牌 4' },
  { value: 'brand5', label: '品牌 5' },
]

const formSchema = z.object({
  title: z.string().nullish(),
  category: z.string().nullish(),
})

export type FormData = TypeOf<typeof formSchema>

export default function ProductForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: null,
    },
  })

  const [loading, setLoading] = useState(false)

  const [streamedText, setStreamedText] = useState('')
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    setStreamedText('')
    const response = await ofetch('/api/product', {
      method: 'POST',
      body: data,
      responseType: 'stream',
    })
    // setLoading(false)
    // toast({
    //   className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'),
    //   title: 'responpse',
    //   description: (
    //     <pre>{JSON.stringify(response, null, 2)}</pre>
    //   ),
    //   duration: 10000,
    // })

    decodeLangchainStream({
      response,
      decoder: value => setStreamedText(prev => `${prev}${value}`),
    })
    setLoading(false)
  }

  return (
    <>
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
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : null}
              Submit
            </Button>
          </form>
        </Form>
      </FormProvider>
      <div>{streamedText}</div>
    </>

  )
}
