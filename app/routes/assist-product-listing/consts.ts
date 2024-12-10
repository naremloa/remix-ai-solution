import type { TypeOf } from 'zod'
import { z } from 'zod'

export const productGenType = z.enum([
  'friendlyUrl',
  'seoTitle',
  'seoDescription',
  'seoKeywords',
  'ogTitle',
  'ogDescription',
  'detail',
])

export type ProductGenType = TypeOf<typeof productGenType>

export const brandOptions: { value: string, label: string }[] = [
  { value: '動漫人物NANO', label: '動漫人物NANO' },
  { value: '品牌 2', label: '品牌 2' },
  { value: '品牌 3', label: '品牌 3' },
  { value: '品牌 4', label: '品牌 4' },
  { value: '品牌 5', label: '品牌 5' },
]

export const formSchema = z.object({
  title: z.string().min(1),
  model: z.string().min(1),
  brand: z.string().min(1),
  friendlyUrl: z.string().nullish(),
  seoTitle: z.string().nullish(),
  seoDescription: z.string().nullish(),
  seoKeywords: z.string().nullish(),
  ogTitle: z.string().nullish(),
  ogDescription: z.string().nullish(),
  detail: z.string().nullish(),
})

export type FormData = TypeOf<typeof formSchema>
