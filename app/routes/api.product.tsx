import { Readable } from 'node:stream'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { langchain } from '~/.server/langchain'
import { pick } from 'radash'
import { createLangchainStream, generateStreamResponseHeader } from '~/lib/utils/stream'

async function promiseTimeout(ms: number) {
  return new Promise(resolver => setTimeout(resolver, ms))
}

export async function action({ request }: ActionFunctionArgs) {
  const data: FormData = await request.json()
  const messages = [
    new SystemMessage('Translate the following from English into Italian'),
    new HumanMessage('hi!'),
  ]
  // const result = await langchain.invoke(messages)

  const stream = createLangchainStream({
    stream: () => langchain.stream(messages),
    encoder: chunk => chunk.content as string,
  })
  const { headers } = generateStreamResponseHeader()
  return new Response(stream, { headers })
}
