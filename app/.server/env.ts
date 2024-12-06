import type { TypeOf } from 'zod'
import { env } from 'node:process'
import { z } from 'zod'
import { zParserSync } from '~/utils/zod-helper'

const envSchema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
  AZURE_OPENAI_INSTANCE_NAME: z.string().min(1),
  AZURE_OPENAI_VERSION: z.string().min(1),
  AZURE_OPENAI_KEY: z.string().min(1),
  AZURE_OPENAI_DEPLOYMENT_NAME: z.string().min(1),
})

// eslint-disable-next-line import/no-mutable-exports
let envInstance: TypeOf<typeof envSchema>

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var __env: TypeOf<typeof envSchema> | undefined
}

if (env.NODE_ENV === 'production') {
  envInstance = zParserSync(envSchema)(env)
}
else {
  if (!globalThis.__env) {
    globalThis.__env = zParserSync(envSchema)(env)
  }
  envInstance = globalThis.__env
}

export { envInstance as env }
