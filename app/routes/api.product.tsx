import type { HumanMessage, SystemMessage } from '@langchain/core/messages'
import type { BaseMessagePromptTemplateLike } from '@langchain/core/prompts'
import type { FormData, ProductGenType } from './assist-product-listing/consts'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { langchain } from '~/.server/langchain'
import { isArray } from 'radash'
import { createLangchainStream, generateStreamResponseHeader } from '~/lib/utils/stream'
import {
  detailMessage,
  friendlyUrlMessage,
  ogDescriptionMessage,
  ogTitleMessage,
  seoDescriptionMessage,
  seoKeywordsMessage,
  seoTitleMessage,
  systemMessage,
} from '~/prompt/assist-listing'

type RunInput = {
  title: string
  model: string
  brand: string
  category: string
  tag: string
}

function createChatTemplate<Input extends Record<string, any>>({ systemMessage, userMessage, input }: {
  input: () => Input
  systemMessage: string | SystemMessage[] | SystemMessage
  userMessage: string | HumanMessage[] | HumanMessage
}) {
  const promptMessages: (ChatPromptTemplate<Input, string> | BaseMessagePromptTemplateLike)[] = []
  // system
  if (isArray(systemMessage))
    promptMessages.push(...systemMessage)
  else if (typeof systemMessage === 'string')
    promptMessages.push(['system', systemMessage])
  else
    promptMessages.push(systemMessage)

  // user
  if (isArray(userMessage))
    promptMessages.push(...userMessage)
  else if (typeof userMessage === 'string')
    promptMessages.push(['user', userMessage])
  else
    promptMessages.push(userMessage)

  const template = ChatPromptTemplate.fromMessages<Input>(promptMessages)
  template.format(input()).then((v) => {
    console.log('input', input())
    console.log('prompt', v)
  })
  return { stream: () => template.pipe(langchain).stream(input()) }
}

export async function action({ request }: ActionFunctionArgs) {
  const { type, data } = await request.json() as { type: ProductGenType, data: Pick<FormData, 'title' | 'model' | 'brand'> & { other: string } }

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
      other: data.other ?? '',
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
