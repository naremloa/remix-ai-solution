import type { Runnable } from '@langchain/core/runnables'

export function createLangchainStream<Chunk>({ stream, encoder }: {
  stream: () => ReturnType<Runnable<any, Chunk>['stream']>
  encoder: (chunk: Chunk) => string
}) {
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of await stream()) {
          controller.enqueue(
            new TextEncoder().encode(encoder(chunk)),
          )
        }
        controller.close()
      }
      catch (err: unknown) {
        controller.error('Error streaming response')
        console.error(err)
      }
    },
  })
}

export function generateStreamResponseHeader() {
  return {
    headers: {
      'Content-Type': 'text/event-stream', // 使用流格式傳輸
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  }
}

export async function decodeLangchainStream({ response, decoder }: {
  response: ReadableStream<Uint8Array>
  decoder: (value: string) => void
}) {
  const reader = response.pipeThrough(new TextDecoderStream()).getReader()
  while (true) {
    const { value, done } = await reader.read()
    if (done)
      break
    decoder(value)
  }
}
