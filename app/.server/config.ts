import type { TypeOf } from 'zod'
import { z } from 'zod'
import { zParserSync } from '~/lib/utils/zod-helper'
import { env } from './env'

const configSchema = z.object({
  azure: z.object({
    azureOpenAIApiInstanceName: z.string().min(1),
    azureOpenAIApiVersion: z.string().min(1),
    azureOpenAIApiKey: z.string().min(1),
    azureOpenAIApiDeploymentName: z.string().min(1),
  }),
})

// eslint-disable-next-line import/no-mutable-exports
let configInstance: TypeOf<typeof configSchema>

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var __config: TypeOf<typeof configSchema> | undefined
}

function createConfig(data: typeof env) {
  return zParserSync(configSchema)({
    azure: {
      azureOpenAIApiInstanceName: data.AZURE_OPENAI_INSTANCE_NAME,
      azureOpenAIApiVersion: data.AZURE_OPENAI_VERSION,
      azureOpenAIApiKey: data.AZURE_OPENAI_KEY,
      azureOpenAIApiDeploymentName: data.AZURE_OPENAI_DEPLOYMENT_NAME,
    },
  })
}

if (env.NODE_ENV === 'production') {
  configInstance = createConfig(env)
}
else {
  if (!globalThis.__config) {
    globalThis.__config = createConfig(env)
  }
  configInstance = globalThis.__config
}

export { configInstance as config }
