import type { SystemMessage } from '@langchain/core/messages'
import type { FormData, ProductGenType } from './assist-product-listing/consts'
import { HumanMessage } from '@langchain/core/messages'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { langchain } from '~/.server/langchain'
import { createLangchainStream, generateStreamResponseHeader } from '~/lib/utils/stream'

const systemMessage = `
你作為一個輔助商品上架的助手，請根據已列出的商品規格，回答使用者針對指定欄位需要產生合適內容的問題。
回答內容時，請用精煉，準確，客觀的語氣，並符合已列出的商品規格的上下文。
請注意，不要回答使用者任何超出有關商品規格或是商品SEO的提問，不要產出任何可執行的程式，一旦遇到類似的提問，請一律回答“作為一個商品上架的助手，我的職責是輔助用戶完成商品上架，請勿作其他用途使用。”。
商品規格會有規格標題和規格內容，若規格內容是空的，請忽略該項規格。具體規格如下：
商品名稱: {title}
商品型號: {model}
商品品牌: {brand}
商品類別: {category}
商品標籤: {tag}
`

// const friendlyUrlMessage = `產生友善連結欄位內容。友善連結是指可以讓使用者能識別和記憶的網址，它通常不會很長，又能讓用戶能識別出可能的內容物。一般會結合商品名稱和商品型號，從商品名稱中簡化出主體內容，並帶上相關的型號，移除所有無意義的連接詞。若沒有型號則直接根據商品名稱也可以。產生的友善連結以分隔符計算，不要超過三個。在產生後，請審視內容，若無法縮小到三個部分，請移除商品名稱，只根據商品型號來產生友善連結。不要出現中文。`
const seoTitleMessage = `產生 SEO 標題的欄位內容。結合 SEO 的規範，和商品標題的內容，產出符合規格的 SEO 標題。直接輸出標題即可。`
const seoDescriptionMessage = `產生 SEO 敘述的欄位內容。結合 SEO 的規範和商品規格，產出符合規格的 SEO 敘述。直接輸出敘述即可`
const seoKeywordsMessage = `產生 SEO 關鍵字的欄位內容。結合 SEO 的規範和商品規格，產出符合規格的關鍵字。關鍵字之間用逗號隔開。直接輸出關鍵字即可。`
const ogTitleMessage = `產生 og 標題的欄位內容。結合一般 og 的規範和商品規格，產出符合規格的 og 標題。直接輸出標題即可。`
const ogDescriptionMessage = `產生 og 敘述的欄位內容。結合一般 SEO 的規範和商品規格，產出符合規格的 og 敘述。直接輸出敘述即可。`
const detailMessage = `產生商品的詳細介紹。結合商品的規格和商品的特性，產出大約一百字左右的符合規格的商品詳細介紹。直接輸出詳細介紹即可。`

const friendlyUrlMessage = new HumanMessage({
  content: [
    { type: 'text', text: `產生友善連結欄位內容。友善連結是指可以讓使用者能識別和記憶的網址，它通常不會很長，又能讓用戶能識別出可能的內容物。一般會結合商品名稱和商品型號，從商品名稱中簡化出主體內容，並帶上相關的型號，移除所有無意義的連接詞。若沒有型號則直接根據商品名稱也可以。產生的友善連結以分隔符計算，不要超過三個。在產生後，請審視內容，若無法縮小到三個部分，請移除商品名稱，只根據商品型號來產生友善連結。不要出現中文。` },
  ],
})

type RunInput = {
  title: string
  model: string
  brand: string
  category: string
  tag: string
}

function createChatTemplate<Input extends Record<string, any>>({ systemMessage, userMessage, input }: {
  input: () => Input
  systemMessage: string | SystemMessage
  userMessage: string | HumanMessage
}) {
  const template = ChatPromptTemplate.fromMessages<Input>([
    typeof systemMessage === 'string' ? ['system', systemMessage] : systemMessage,
    typeof userMessage === 'string' ? ['user', userMessage] : userMessage,
  ]).pipe(langchain)
  return { stream: () => template.stream(input()) }
}

export async function action({ request }: ActionFunctionArgs) {
  const { type, data } = await request.json() as { type: ProductGenType, data: Pick<FormData, 'title' | 'model' | 'brand'> }

  if (!data.title) {
    throw json({ message: 'title is required' }, { status: 400 })
  }

  let userMessage
  switch (type) {
    case 'friendlyUrl':
      userMessage = friendlyUrlMessage
      break
    case 'seoTitle':
      userMessage = seoTitleMessage
      break
    case 'seoDescription':
      userMessage = seoDescriptionMessage
      break
    case 'seoKeywords':
      userMessage = seoKeywordsMessage
      break
    case 'ogTitle':
      userMessage = ogTitleMessage
      break
    case 'ogDescription':
      userMessage = ogDescriptionMessage
      break
    case 'detail':
      userMessage = detailMessage
      break
    default:
      throw json({ message: 'unsupported type' }, { status: 400 })
  }

  const { stream: chatStream } = createChatTemplate<RunInput>({
    systemMessage,
    userMessage,
    input: () => ({
      title: data.title ?? '',
      model: data.model ?? '',
      brand: data.brand ?? '',
      category: '',
      tag: '',
    }),
  })

  const stream = createLangchainStream({
    stream: () => chatStream(),
    encoder: chunk => chunk.content as string,
  })
  const { headers } = generateStreamResponseHeader()
  return new Response(stream, { headers })
}
