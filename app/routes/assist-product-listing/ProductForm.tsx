import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FetchError, ofetch } from 'ofetch'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '~/lib/components/Button'
import { toast } from '~/lib/hooks/use-toast'
import { decodeLangchainStream } from '~/lib/utils/stream'
import { Card, CardContent, CardHeader, CardTitle } from '~/shadcn/components/ui/card'
import { Form } from '~/shadcn/components/ui/form'
import { brandOptions, type FormData, formSchema, type ProductGenType } from './consts'
import { FormInput, FormSelect, FormTextarea } from './FormField'
import { SpecBox, SpecItem } from './Spec'

export default function ProductForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '【動漫角色】NANOBLOCK積木 NBMC_23S Mininano 我的英雄學院 vol.2一盒(一盒6PCS)  綠谷出久、切島銳兒郎、相澤消太、蛙吹梅雨、奮進人、霍克斯',
      model: 'KD22132 x6',
      brand: '',
      friendlyUrl: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      ogTitle: '',
      ogDescription: '',
      detail: '',
    },
  })

  const formData = form.watch()

  const [loading, setLoading] = useState(false)
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    await new Promise(res => setTimeout(res, 3000))
    console.debug('submit data', data)
    setLoading(false)
  }

  const sparkle = async (type: ProductGenType) => {
    try {
      setLoading(true)
      const response = await ofetch('/api/product', {
        method: 'POST',
        body: {
          type,
          data: {
            title: formData.title,
            model: formData.model,
            brand: formData.brand,
          },
        },
        responseType: 'stream',
      })
      form.setValue(type, '')
      decodeLangchainStream({
        response,
        decoder: (value) => {
          form.setValue(type, `${form.getValues()[type]}${value}`)
        },
      })
    }
    catch (err: unknown) {
      let message: string = ''
      if (err instanceof FetchError) {
        const errData = await err.response?.json() as { message: string } | undefined
        message = errData?.message ?? ''
      }
      else {
        message = String(err)
      }
      toast({
        title: 'API Error',
        description: message,
        duration: 10000,
        variant: 'destructive',
      })
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-[2]">
            <FormInput<FormData> label="名稱" name="title" required></FormInput>
            <FormInput<FormData> label="型號" name="model" required></FormInput>
            <FormSelect<FormData> label="品牌" name="brand" required options={brandOptions}></FormSelect>
            <FormInput<FormData> label="友善連結" name="friendlyUrl" sparkle={() => sparkle('friendlyUrl')}></FormInput>
            <FormInput<FormData> label="SEO 標題" name="seoTitle" sparkle={() => sparkle('seoTitle')}></FormInput>
            <FormTextarea<FormData>
              label="SEO 描述"
              name="seoDescription"
              sparkle={() => sparkle('seoDescription')}
              rows={5}
            >
            </FormTextarea>
            <FormInput<FormData> label="SEO 關鍵字" name="seoKeywords" sparkle={() => sparkle('seoKeywords')}></FormInput>
            <FormInput<FormData> label="OG 標題" name="ogTitle" sparkle={() => sparkle('ogTitle')}></FormInput>
            <FormTextarea<FormData> label="OG 描述" name="ogDescription" sparkle={() => sparkle('ogDescription')} rows={5}></FormTextarea>
            <FormTextarea<FormData> label="詳細介紹" name="detail" sparkle={() => sparkle('detail')} rows={10}></FormTextarea>
            <Button type="submit" loading={loading}>Submit</Button>
          </form>
        </Form>
      </FormProvider>
      <div className="flex-1 m-4">
        <Card className="sticky top-[60px] text-sm">
          <CardHeader>
            <CardTitle>規格</CardTitle>
          </CardHeader>
          <CardContent>
            <SpecBox>
              <SpecItem label="名稱" value={formData.title}></SpecItem>
              <SpecItem label="型號" value={formData.model}></SpecItem>
              <SpecItem label="品牌" value={brandOptions.find(i => i.value === formData.brand)?.label ?? ''}></SpecItem>
            </SpecBox>
          </CardContent>
        </Card>
      </div>
    </div>

  )
}
