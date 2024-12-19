import type { ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'
import { graph } from '~/.server/agent'
import { createConsola } from '~/lib/utils/consola'
import { generateStreamResponseHeader } from '~/lib/utils/stream'

const consola = createConsola()

const bodySchema = z.object({
  message: z.string().nonempty(),
})

export async function action({ request }: ActionFunctionArgs) {
  const { message } = await bodySchema.parseAsync(await request.json())
  const output = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of await graph.stream({ messages: [{ role: 'user', content: message }] } as any, { streamMode: 'values' })) {
          consola.log('chunk', chunk)
          const msg = chunk.messages.at(-1)
          controller.enqueue(
            new TextEncoder().encode(msg.content),
          )
        }
        controller.close()
      }
      catch (err: unknown) {
        controller.error('Error streaming response')
        consola.error(err)
      }
    },
  })
  const { headers } = generateStreamResponseHeader()
  return new Response(output, { headers })
}
